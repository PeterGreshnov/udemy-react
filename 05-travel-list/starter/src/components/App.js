import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
