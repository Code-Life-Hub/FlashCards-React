import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeckForm from "./DeckForm";

export default function DeckEdit({ submitHandler }) {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
        readDeck(deckId).then((data) => setDeck(data));
    }, [deckId]);

    return (
        <div>
            <nav className="breadcrumb">
                <Link className="breadcrumb-item" to="/">
                    Home
                </Link>
                <Link
                    className="breadcrumb-item"
                    to={`/decks/${deck && deck.id}`}
                >
                    {deck && deck.name}
                </Link>
                <span className="breadcrumb-item active" aria-current="page">
                    Edit Deck
                </span>
            </nav>
            <DeckForm
                header="Edit Deck"
                key={deck.id}
                initialFormData={{
                    id: deck.id,
                    name: deck.name,
                    description: deck.description,
                }}
                submitHandler={submitHandler}
            />
        </div>
    );
}
