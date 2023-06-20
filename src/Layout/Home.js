import React from "react";
import Card from "./Card";

const Home = ({ decks, deleteDeckHandler }) => {
    const deckList = decks.map((e) => (
        <Card flashcard={e} deleteDeckHandler={deleteDeckHandler} key={e.id} />
    ));
    return <div>{decks && deckList}</div>;
};

export default Home;
