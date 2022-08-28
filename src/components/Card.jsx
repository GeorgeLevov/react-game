import { useState } from "react";
import "./Card.css";

export default function Card({ id, value, lockedIn, lockCard }) {
    // const [count, setCount] = useState(0);

    return (
        <div className={lockedIn ? "card locked" : "card"} onClick={lockCard}>
            <img src={value}></img>
        </div>
    );
}
