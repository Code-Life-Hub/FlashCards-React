import React, { useEffect, useState } from "react";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";

const CreateCard = ({ submitHandler }) => {
    const formData = { front: "", back: "" };
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        readDeck(deckId).then((data) => setDeck(data));
    }, [deckId]);

    return (
        <div>
            <nav className="breadcrumb">
                <Link className="breadcrumb-item" to="/">
                    Home
                </Link>
                <Link className="breadcrumb-item" to={`/decks/${deck.id}`}>
                    {deck.name}
                </Link>
                <span className="breadcrumb-item active" aria-current="page">
                    Add Card
                </span>
            </nav>

            <CardForm
                header={"Add Card"}
                initialFormData={formData}
                submitHandler={submitHandler}
            />
        </div>
    );
};

export default CreateCard;
