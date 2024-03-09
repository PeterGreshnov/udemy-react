import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    const style = {};
    // const style = {
    //     color: "red",
    //     fontSize: "48px",
    //     textTransform: "uppercase",
    // };

    return (
        <header className="header">
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    return (
        <main className="menu">
            <h2>Our Menu</h2>

            <ul className="pizzas">
                {pizzaData.map((pizza) => {
                    return (
                        <Pizza
                            pizzaObj={pizza}
                            key={pizza.name}
                        />
                    );
                })}
            </ul>
            {/* <Pizza
                name="Pizza Prosciutto"
                ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
                photo="pizzas/prosciutto.jpg"
                price={10}
            />
            <Pizza
                name="Pizza Funghi"
                ingredients="PELMENI"
                photo="pizzas/funghi.jpg"
                price={12}
            /> */}
        </main>
    );
}

function Pizza(props) {
    console.log(props);
    return (
        <li className="pizza">
            <img
                src={props.pizzaObj.photoName}
                alt={props.pizzaObj.name}
            ></img>
            <div>
                <h3>{props.pizzaObj.name}</h3>
                <p>{props.pizzaObj.ingredients}</p>
                <span>{props.pizzaObj.price + 2}</span>
            </div>
        </li>
    );
}

function Footer() {
    const hour = new Date().getHours();
    console.log(hour);
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen);
    // if (hour >= openHour && hour <= closeHour) alert("We're open!");
    // else alert("We're closed");
    return (
        <footer className="footer">
            {new Date().toLocaleTimeString()}. We're currently open
        </footer>
    );
    //   return React.createElement("footer", null, "We're currently open");
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
