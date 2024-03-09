import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { flushSync } from "react-dom";

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
    const pizzas = pizzaData;
    // const pizzas = [];
    const numPizzas = pizzas.length ?? 0;

    return (
        <main className="menu">
            <h2>Our Menu</h2>
            {numPizzas > 0 ? (
                <React.Fragment>
                    <p>Please, see our fine choise of best pizzas.</p>
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
                </React.Fragment>
            ) : (
                <p>Working on menu, come back later.</p>
            )}
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

function Pizza({ pizzaObj }) {
    console.log(pizzaObj);
    // if (pizzaObj.soldOut) return null;

    return (
        <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
            <img
                src={pizzaObj.photoName}
                alt={pizzaObj.name}
            ></img>
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
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

    if (!isOpen) {
        return (
            <footer className="footer">
                <p>
                    You are welcomed between {openHour}:00 and {closeHour}:00
                </p>
            </footer>
        );
    }

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} />
            ) : (
                <p>
                    We're closed. You are welcomed between {openHour}:00 and{" "}
                    {closeHour}:00
                </p>
            )}

            {/* {new Date().toLocaleTimeString()}. We're currently open */}
        </footer>
    );
    //   return React.createElement("footer", null, "We're currently open");
}

function Order(props) {
    return (
        <div className="order">
            <p>We're open until {props.closeHour}:00. Come visit us!</p>
            <button className="btn">Order</button>
        </div>
    );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
