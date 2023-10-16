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
import { Switch, Route, Link, useHistory } from "react-router-dom";
import DeckCreate from "./DeckCreate";
import Study from "./Study";
import Deck from "./Deck";
import DeckEdit from "./DeckEdit";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";

const defaultDeck = {
  id: 1,
  name: "Tutorial",
  description:
    "A tutorial / walk through of the website and its functions. For best experience, click 'Study' to go through tutorial in 'Study Mode'.",
};

function Layout() {
  const [decks, setDecks] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false); // New state variable
  const history = useHistory();

  useEffect(() => {
    listDecks().then((fetchedDecks) => {
      const tutorialDeckExists = fetchedDecks.some(
        (deck) => deck.id === defaultDeck.id
      );

      if (!tutorialDeckExists) {
        fetchedDecks.unshift(defaultDeck);
      }

      fetchedDecks.sort((a, b) => {
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        return a.id - b.id;
      });

      setDecks(fetchedDecks);
      setForceUpdate((prev) => !prev); // Toggle forceUpdate state
    });
  }, [forceUpdate]); // Add forceUpdate as a dependency

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
    if (
      window.confirm(
        "Are you sure you want to delete this Deck? It can't be undone."
      )
    ) {
      deleteDeck(id).then(() => {
        listDecks().then((data) => setDecks(data));
        history.push(`/`);
      });
    }
  };

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Link to="/decks/new" className="btn btn-secondary mb-2">
            Create Deck
          </Link>
          {decks.length ? (
            <Home decks={decks} deleteDeckHandler={deleteDeckHandler} />
          ) : (
            <h2 className="mt-3 text-white">No decks have been created</h2>
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
