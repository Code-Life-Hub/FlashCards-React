import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import {
    createDeck,
    listDecks,
    updateDeck,
    deleteDeck,
    createCard,
} from "../utils/api";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import DeckCreate from "./DeckCreate";
import { Link, useHistory } from "react-router-dom";
import Study from "./Study";
import Deck from "./Deck";
import DeckEdit from "./DeckEdit";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";

function Layout() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        listDecks().then((data) => setDecks(data));
    }, []);

    const submitDeckHandler = (data) => {
        createDeck(data).then((data) => {
            listDecks().then((data) => setDecks(data));
            history.push(`/decks/${data.id}`);
        });
    };

    const updateDeckHandler = (data) => {
        updateDeck(data).then((data) => {
            listDecks().then((data) => setDecks(data));
            history.push(`/decks/${data.id}`);
        });
    };

    const submitCardHandler = (id, data) => {
        createCard(id, data).then((data) => {
            listDecks().then((data) => setDecks(data));
            history.push(`/decks/${data.deckId}`);
        });
    };

    const deleteDeckHandler = (id) => {
        console.log(id, "Card Component DeleteBtn");

        if (window.confirm("Do you really want to delete this deck?")) {
            deleteDeck(id).then(() => {
                listDecks().then((data) => setDecks(data));
                history.push(`/`);
            });
        }
    };

    // const deleteCardHandler = (id, deckId) => {
    //     console.log(id, "Card Component deleteCardById");
    //     if (
    //         window.confirm(
    //             "Are you sure you want to delete this card? \n \n You will not be able to recover it."
    //         )
    //     ) {
    //         deleteCard(id).then(() => {
    //             listDecks().then((data) => setDecks(data));
    //             history.push(`/decks/${deckId}`);
    //         });
    //     }
    // };

    return (
        <div className="container">
            <Header />
            {/* TODO: Implement the screen starting here */}
            <Switch>
                <Route path="/" exact>
                    <Link to="/decks/new" className="btn btn-secondary mb-2">
                        Create Deck
                    </Link>
                    {decks.length ? (
                        <Home
                            decks={decks}
                            deleteDeckHandler={deleteDeckHandler}
                        />
                    ) : (
                        <h2 className="mt-3 text-dark">
                            No decks have been created
                        </h2>
                    )}
                </Route>
                <Route path="/decks/new">
                    <DeckCreate submitHandler={submitDeckHandler} />
                </Route>
                <Route path="/decks/:deckId" exact>
                    <Deck deleteDeckHandler={deleteDeckHandler} />
                </Route>
                <Route path="/decks/:deckId/study">
                    <Study />
                </Route>
                <Route path="/decks/:deckId/edit">
                    <DeckEdit submitHandler={updateDeckHandler} />
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <CreateCard submitHandler={submitCardHandler} />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default Layout;
