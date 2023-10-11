import React from "react";
import DeckForm from "./DeckForm";
import { Link } from "react-router-dom";

function DeckCreate({ submitHandler }) {
    const formData = { name: "", description: "" };

    return (
        <div>
            <nav className="breadcrumb">
                <Link className="breadcrumb-item" to="/">
                    Home
                </Link>
                <span className="breadcrumb-item active" aria-current="page">
                    Create Deck
                </span>
            </nav>
            <DeckForm
                header="Create Deck "
                initialFormData={formData}
                submitHandler={submitHandler}
            />
        </div>
    );
}

export default DeckCreate;
