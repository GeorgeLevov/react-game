import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ClubImage from "./assets/icons8-clubs-64.png";
import DiamondImage from "./assets/icons8-diamond-64.png";
import HeartImage from "./assets/icons8-heart-64.png";
import SpadeImage from "./assets/icons8-spades-64.png";

function App() {
    const imageArray = [ClubImage, DiamondImage, HeartImage, SpadeImage];

    return (
        <main>
            <div className="card-container">
                <Card
                    key={1}
                    value={
                        imageArray[
                            Math.floor(Math.random() * imageArray.length)
                        ]
                    }
                ></Card>
            </div>
        </main>
    );
}

export default App;
