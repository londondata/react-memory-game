import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  flipped: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
};

function Card({ handleClick, id, type, flipped, height, width, disabled }) {
  return (
    <>
      <div
        className={`flip-container ${flipped ? "flipped" : ""}`}
        style={{ width, height }}
        onClick={() => (disabled ? null : handleClick(id))}
      >
        <div className="flipper">
          <img
            style={{ height, width }}
            className={flipped ? "front" : "back"}
            src={flipped ? `/img/${type}.jpeg` : `/img/cardback.jpg`}
          />
        </div>
      </div>
    </>
  );
}

export default Card;
