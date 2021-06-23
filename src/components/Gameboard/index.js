import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";

import "./styles.css";

Gameboard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
	solved: PropTypes.arrayOf(PropTypes.number).isRequired,
	handleClick: PropTypes.func.isRequired,
	dimension: PropTypes.number.isRequired,
	disabled: PropTypes.bool.isRequired,
};

function Gameboard({
	disabled,
	dimension,
	cards,
	flipped,
	handleClick,
	solved,
}) {
	return (
		<>
				<div className="gameboard">
					{cards.map((card) => (
						<Card
							key={card.id}
							id={card.id}
							type={card.type}
							width={dimension / 4.5}
							height={dimension / 4.5}
							flipped={flipped.includes(card.id)}
							handleClick={handleClick}
							disabled={disabled || solved.includes(card.id)}
							solved={solved.includes(card.id)}
						/>
					))}
				</div>
		</>
	);
}

export default Gameboard;
