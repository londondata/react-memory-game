function shuffle(array) {
	const newArray = array.slice(0);
	for (let i = 0; i < array.length - 1; i++) {
		let randomIndex = Math.floor(Math.random() * (i + 1));
		let temp = newArray[i];
		newArray[i] = newArray[randomIndex];
		newArray[randomIndex] = temp;
	}

	return newArray;
}

export default function initializeDeck() {
	let id = 0;
	const cards = [
		"pikachu",
		"gastly",
		"eevee",
		"charizard",
		"gengar",
		"golbat",
		"riolu",
		"typhlosion",
		"muk",
		"mew",
	].reduce((acc, type) => {
		acc.push({
			id: id++,
			type,
		});
		acc.push({
			id: id++,
			type,
		});
		return acc;
	}, []);

	return shuffle(cards);
}
