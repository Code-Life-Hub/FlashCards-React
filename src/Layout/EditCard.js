import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
    const { cardId, deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        readCard(cardId).then((data) => setCard(data));
    }, [cardId]);

    useEffect(() => {
        readDeck(deckId).then((data) => setDeck(data));
    }, [deckId]);

    const submitHandler = (id, formData) => {
        updateCard(formData).then((data) => {
            history.push(`/decks/${deck.id}`);
        });
    };

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
                    Edit Card {card.id}
                </span>
            </nav>

            {card && (
                <CardForm
                    header={"Edit Card"}
                    key={card.id}
                    initialFormData={{
                        id: card.id,
                        front: card.front,
                        back: card.back,
                        deckId: card.deckId,
                    }}
                    submitHandler={submitHandler}
                />
            )}
        </div>
    );
}
