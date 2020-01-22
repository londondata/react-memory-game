import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gameboard from "../Gameboard";
import initializeDeck from "../Deck/index.js";

const firstDeck = initializeDeck();

function App() {
  const { cards, flipped, solved, disabled } = useSelector(state => state);
  const dispatchGameState = useDispatch();
  const [dimension, setDimension] = useState(400);

  //board settings

  useEffect(() => {
    resizeBoard();
    dispatchGameState({
      type: "generateCards",
      payload: firstDeck
    });
  }, [dispatchGameState]);

  // useEffect(() => {
  //   preloadImages();
  // }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // const preloadImages = () => {
  //   cards.map(card => {
  //     const src = `/img/${card.type}.jpeg`;
  //     new Image().src = src;
  //   });
  // };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  //game logic

  const sameCardClicked = id => flipped.includes(id);

  const isMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const handleClick = id => {
    dispatchGameState({ type: "disableBoard" });
    if (flipped.length === 0) {
      dispatchGameState({ type: "flippedCards", payload: [id] });
      dispatchGameState({ type: "enableBoard" });
    } else {
      if (sameCardClicked(id)) return;
      dispatchGameState({
        type: "flippedCards",
        payload: [flipped[0], id]
      });
      if (isMatch(id)) {
        dispatchGameState({
          type: "flippedCards",
          payload: [id]
        });
        dispatchGameState({
          type: "solvedCards",
          payload: [...solved, flipped[0], id]
        });
        dispatchGameState({ type: "resetFlippedCards" });
      } else {
        setTimeout(
          () => dispatchGameState({ type: "resetFlippedCards" }),
          2000
        );
      }
    }
  };

  //local storage

  // useEffect(() => {
  //   const LScards = localStorage.getItem(
  //     "cards",
  //     "flipped",
  //     "solved",
  //     "disabled"
  //   );
  //   if (LScards)
  //     dispatchGameState({
  //       type: "storeGame",
  //       payload: JSON.parse(LScards)
  //     });
  // }, [dispatchGameState]);

  // useEffect(() => {
  //   localStorage.setItem("cards", JSON.stringify(cards));
  // }, [cards]);

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
