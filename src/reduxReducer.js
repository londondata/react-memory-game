const initialState = {};

export default (prevState = initialState, { type, payload }) => {
  console.log({ type, payload });
  switch (type) {
    default:
      return { ...prevState };
  }
};
