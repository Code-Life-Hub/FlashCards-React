import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { Link } from "react-router-dom";

function Study() {
    const [deckArr, setDeckArr] = useState({});
    const [flipped, setFlipped] = useState(false);
    const [count, setCount] = useState(0);
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (deckId) {
            readDeck(deckId).then((data) => setDeckArr(data));
        }
    }, [deckId]);

    const handleNext = () => {
        setCount((e) => e + 1);
        setFlipped(false);
        if (count + 1 === deckArr.cards.length) {
            if (
                window.confirm(
                    "Restart cards?\n \n Click cancel to return home"
                )
            ) {
                setCount(0);
            } else {
                history.push("/");
            }
        }
    };

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckArr.id}`}>{deckArr.name}</Link>
                </li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
            <h1>Study: {deckArr.name}</h1>

            {deckArr.cards && deckArr.cards[count] && (
                <div className="card">
                    {deckArr.cards.length >= 2 ? (
                        <div className="card-body">
                            {deckArr.cards.length ? (
                                <h4 className="card-title text-body">
                                    Card {count + 1} of {deckArr.cards.length}
                                </h4>
                            ) : (
                                <h4>Not enough cards</h4>
                            )}
                            {deckArr.cards && (
                                <p className="card-text">
                                    {flipped
                                        ? deckArr.cards[count].back
                                        : deckArr.cards[count].front}
                                </p>
                            )}
                            <button
                                className="btn btn-secondary"
                                onClick={() => setFlipped(!flipped)}
                            >
                                Flip
                            </button>
                            {flipped && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleNext()}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="card-body">
                            <h3>Not enough cards.</h3>
                            <p>
                                You need at least 3 cards to study. There are{" "}
                                {deckArr.cards.length} cards in this deck
                            </p>
                            <Link to="cards/new" className="btn btn-primary">
                                Add Cards
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Study;
