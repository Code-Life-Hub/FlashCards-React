import React from "react";
import { Link } from "react-router-dom";
export default function Card({ flashcard, deleteDeckHandler }) {
    const { id, name, description } = flashcard;

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h4 className="card-title text-muted">
                    {name}{" "}
                    <span className="h6 float-right">
                        {flashcard.cards.length} cards
                    </span>
                </h4>
                <p className="card-text text-muted">{description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/decks/${id}`} className="btn btn-secondary">
                            View
                        </Link>
                        <Link
                            to={`/decks/${id}/study`}
                            className="btn btn-primary mx-2"
                        >
                            Study
                        </Link>
                    </div>
                    <button
                        onClick={() => deleteDeckHandler(id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
