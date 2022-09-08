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

    const [matched, setMatched] = useState(false);

    // turn counter to help with highScore tracking
    const [turnCount, setTurnCount] = useState(1);

    const generateCards = (count) => {
        const cardArray = Array.apply(null, Array(count)).map(() => {
            const cardId = nanoid();
            return {
                id: cardId,
                value: cardFaces[Math.floor(Math.random() * cardFaces.length)],
                lockedIn: false,
            };
        });
        return cardArray;
    };

    const lockCard = (id) => {
        setCards((cards) =>
            cards.map((card) => {
                return {
                    ...card,
                    lockedIn: card.id == id ? !card.lockedIn : card.lockedIn,
                };
            })
        );
    };

    const [cards, setCards] = useState(generateCards(9));

    const cardElements = cards.map((card) => (
        <Card
            key={card.id}
            lockedIn={card.lockedIn}
            value={card.value}
            lockCard={() => lockCard(card.id)}
        ></Card>
    ));

    const drawCards = () => {
        setTurnCount((turnCount) => turnCount + 1);
        if (!matched) {
            setCards((cards) =>
                cards.map((card) => {
                    card = card.lockedIn ? card : generateCards(1)[0];
                    return card;
                })
            );
        } else {
            if (
                turnCount <=
                parseInt(localStorage.getItem("matching_suites_high_score"))
            ) {
                localStorage.setItem("matching_suites_high_score", turnCount);
            }

            setMatched(() => false);
            setCards(() => generateCards(9));
            setTurnCount((turnCount) => 1);
        }
    };

    useEffect(() => {
        const valueToMatch = cards[0].value;
        const matchingCards = cards.every(
            (card) => card.value == valueToMatch && card.lockedIn
        );

        setMatched(() => matchingCards);
    }, [cards]);

    // setting highScore tracker
    useEffect(() => {
        localStorage.setItem("matching_suites_high_score", 100);
    }, []);

    return (
        <main>
            <h1>Card Match</h1>
            <h3>
                You have drawn 9 random cards. Try to match all cards using the
                least number of turns. Click on each card to lock in it's suit.
            </h3>
            {matched ? (
                <h3>
                    Congratulations!
                    <br />
                    You won in {turnCount} turns!
                    {turnCount <=
                    parseInt(localStorage.getItem("matching_suites_high_score"))
                        ? " You Reached a new High Score!"
                        : ""}
                </h3>
            ) : (
                <h3></h3>
            )}
            <div className="card-container">{cardElements}</div>

            <button className="card-reset-btn" onClick={drawCards}>
                {matched ? "Start new game" : "Next turn"}
            </button>
        </main>
    );
}

export default App;
