import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CardForm = ({ header, initialFormData, submitHandler }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        });
    }, [deckId]);

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log(formData);

        submitHandler(deckId, formData);
        setFormData({ ...initialFormData });
    };

    return (
        <div>
            <h3>
                {deck.name}: {header}
            </h3>

            <form className="mb-3" onSubmit={handleFormSubmit}>
                <label htmlFor="front" className="form-label">
                    Front
                </label>
                <textarea
                    name="front"
                    id="front"
                    className="form-control"
                    value={formData.front}
                    placeholder="Front side of card"
                    onChange={handleInput}
                />
                <label htmlFor="back" className="form-label mt-2">
                    Back
                </label>
                <textarea
                    name="back"
                    id="back"
                    className="form-control"
                    value={formData.back}
                    placeholder="Back side of card"
                    onChange={handleInput}
                />
                <div className="mt-3">
                    <Link
                        to={`/decks/${deck.id}`}
                        className="btn btn-secondary"
                    >
                        Done
                    </Link>
                    <button type="submit" className="btn btn-primary mx-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CardForm;
