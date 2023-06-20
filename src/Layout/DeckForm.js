import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeckForm = ({ header, initialFormData, submitHandler }) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        submitHandler(formData);
        setFormData({ ...initialFormData });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <h1>{header}</h1>
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control mb-2"
                    placeholder="Deck Name"
                    value={formData.name}
                    onChange={handleInput}
                />
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Brief description of the deck"
                    value={formData.description}
                    onChange={handleInput}
                />
            </div>
            <Link
                to={header === "Edit Deck" ? `/decks/${formData.id}` : "/"}
                className="btn btn-secondary"
            >
                Cancel
            </Link>
            <button type="submit" className="btn btn-primary mx-2">
                Submit
            </button>
        </form>
    );
};

export default DeckForm;
