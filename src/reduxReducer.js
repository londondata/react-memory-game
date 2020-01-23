const initialState = {
  cards: [],
  flipped: [],
  solved: [],
  disabled: false
};

export default (prevState = initialState, { type, payload }) => {
  switch (type) {
    case "generateCards":
      return { ...prevState, cards: payload };
    case "storeCards":
      return { ...prevState, cards: payload };
    case "disableBoard":
      return { ...prevState, disabled: true };
    case "enableBoard":
      return { ...prevState, disabled: false };
    case "flippedCards":
      return { ...prevState, flipped: payload };
    case "solvedCards":
      return { ...prevState, solved: payload };
    case "resetFlippedCards":
      return { ...prevState, flipped: initialState.flipped, disabled: false };
    case "resetGame":
      return initialState;
    default:
      return prevState;
  }
};
