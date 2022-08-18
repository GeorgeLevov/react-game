import { useState } from "react";
import "./Card.css";

export default function Card({ value }) {
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <img src={value}></img>
        </div>
    );
}
