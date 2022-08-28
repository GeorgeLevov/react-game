import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import ClubImage from "./assets/icons8-clubs-64.png";
import DiamondImage from "./assets/icons8-diamond-64.png";
import HeartImage from "./assets/icons8-heart-64.png";
import SpadeImage from "./assets/icons8-spades-64.png";
import { nanoid } from "nanoid";

function App() {
    // array of the images that we're going to need for the game
    const cardFaces = [ClubImage, DiamondImage, HeartImage, SpadeImage];

    // generating the individual card components inside the function below,
    // maybe the function can be broken down to a function creating card objects whose keys are then piped into components
    // but the Card component it's simple enough that it doesn't need to be reworked
    const generateCards = (count) => {
        const cardArray = Array.apply(null, Array(count)).map(() => {
            return (
                <Card
                    key={nanoid()}
                    lockedIn={false}
                    value={
                        cardFaces[Math.floor(Math.random() * cardFaces.length)]
                    }
                ></Card>
            );
        });
        return cardArray;
    };

    const [cards, setCards] = useState(generateCards(8));

    const resetCards = () => {
        setCards(() => generateCards(8));
    };

    return (
        <main>
            <div className="card-container">{cards}</div>

            <button className="card-reset-btn" onClick={resetCards}>
                Set Cards
            </button>
        </main>
    );
}

export default App;
