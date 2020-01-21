import React, { useState, useEffect, useReducer } from "react";
import Gameboard from "../Gameboard";
import initializeDeck from "../Deck/index.js";

function gameReducer(prevState, action) {
  switch (action.type) {
    case "generateCards":
      return { ...prevState, cards: action.payload };
    case "disableBoard":
      return { ...prevState, disabled: true };
    case "enableBoard":
      return { ...prevState, disabled: false };
    case "flippedCards":
      return { ...prevState, flipped: action.payload };
    case "solvedCards":
      return { ...prevState, solved: action.payload };
    case "resetFlippedCards":
      return { ...prevState, flipped: initialState.flipped, disabled: false };
    case "resetGame":
      return initialState;
    default:
      return prevState;
  }
}

const initialState = {
  cards: [],
  flipped: [],
  // dimension: 400,
  solved: [],
  disabled: false
};

function App() {
  // const [cards, setCards] = useState([]);
  // const [flipped, setFlipped] = useState([]);
  // const [solved, setSolved] = useState([]);
  // const [disabled, setDisabled] = useState(false);

  const [dimension, setDimension] = useState(400);

  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const { cards, flipped, solved, disabled } = state;

  useEffect(() => {
    resizeBoard();
    dispatch({ type: "generateCards", payload: initializeDeck() });
  }, []);

  useEffect(() => {
    preloadImages();
  }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  });

  const handleClick = id => {
    dispatch({ type: "disableBoard" });
    if (flipped.length === 0) {
      dispatch({ type: "flippedCards", payload: [id] });
      dispatch({ type: "enableBoard" });
    } else {
      if (sameCardClicked(id)) return;
      dispatch({ type: "flippedCards", payload: [[0], id] });
      if (isMatch(id)) {
        dispatch({ type: "flippedCards", payload: [id] });
        dispatch({ type: "solvedCards", payload: [...solved, flipped[0], id] });
        dispatch({ type: "resetFlippedCards" });
      } else {
        dispatch({ type: "resetFlippedCards" });
        setTimeout(2000);
      }
    }
  };

  const sameCardClicked = id => flipped.includes(id);

  const isMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  // const resetCards = () => {
  //   setFlipped([]);
  //   setDisabled(false);
  // };

  const preloadImages = () => {
    cards.map(card => {
      const src = `/img/${card.type}.jpeg`;
      new Image().src = src;
    });
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  return (
    <>
      <h2>let's play a memory game!</h2>
      <Gameboard
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </>
  );
}

export default App;
