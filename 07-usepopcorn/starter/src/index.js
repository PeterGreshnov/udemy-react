import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";

function Test() {
    const [movRating, setMovRating] = useState(0);

    return (
        <div>
            <StarRating
                color="blue"
                maxRating={10}
                onSetRating={setMovRating}
            />
            <p>This movie was rated {movRating} stars</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <StarRating
            maxRating={10}
            messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
        />
        <StarRating
            maxRating={10}
            color="red"
            size={24}
            className="test"
            defaultRating={3}
        />
        <Test />
    </React.StrictMode>
);
