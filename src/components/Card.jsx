import { useState } from "react";
import "./Card.css";

export default function Card({ key, value, lockedIn }) {
    // const [count, setCount] = useState(0);

    return (
        <div id={key} className="card">
            <img src={value}></img>
        </div>
    );
}
