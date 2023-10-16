import React from "react";
import Card from "./Card";

const Home = ({ decks, deleteDeckHandler }) => {
  console.log("Home component rendered with decks:", decks);

  // Sort the decks array to ensure the "Tutorial" deck appears first
  const sortedDecks = [...decks].sort((a, b) => {
    if (a.name === "Tutorial") return -1;
    if (b.name === "Tutorial") return 1;
    return 0; // No change in order for other decks
  });

  const deckList = sortedDecks.map((e) => (
    <Card flashcard={e} deleteDeckHandler={deleteDeckHandler} key={e.id} />
  ));

  return <div>{deckList}</div>;
};

export default Home;
