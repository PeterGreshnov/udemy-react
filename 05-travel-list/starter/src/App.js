import { useState } from "react";

// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: false },
//     { id: 3, description: "Charger", quantity: 1, packed: true },
//     { id: 4, description: "Toothbrush", quantity: 2, packed: false },
// ];

export default function App() {
    const [items, setItem] = useState([]); // we might've used initialItems as initial state

    function handleAddItems(item) {
        setItem((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItem((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItem((items) =>
            items.map((i) => {
                if (i.id === id) {
                    return { ...i, packed: !i.packed };
                }
                return i;
            })
        );
    }

    function handleClearItems() {
        const confirmed = window.confirm("Are you sure?");

        if (confirmed) setItem([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onClearItems={handleClearItems}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 🏖️</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted", e);

        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        console.log(newItem);

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form
            className="add-form"
            onSubmit={handleSubmit}
        >
            <h3>What do you need for your trip? 🚕 </h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option
                        value={num}
                        key={num}
                    >
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") {
        sortedItems = [...items];
    }

    if (sortBy === "description") {
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    }

    if (sortBy === "packed") {
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        key={item.id}
                    />
                ))}
            </ul>

            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by Input Order</option>
                    <option value="description">Sort by Description</option>
                    <option value="packed">Sort by Packed Status</option>
                </select>
                <button onClick={onClearItems}>Clear list</button>
            </div>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => {
                    onToggleItem(item.id);
                }}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start packing 🚀</em>
            </p>
        );

    const numItems = items.length;
    const numPacked = items.filter((i) => i.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100).toFixed(0);

    return (
        <footer className="stats">
            <em>
                {percentage === "100"
                    ? "GO GO GO ✈️"
                    : `💼 You have ${numItems} items on your list, and you already
                packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}
