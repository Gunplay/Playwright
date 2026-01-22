const fruit = {
	name: 'Apple',
	color: 'Red',
	weight: 150,
	origin: 'USA',
};

const { name, origin } = fruit;

console.log(`Fruit: ${name}, Origin: ${origin}`);

const array = ['apple', 'banana', 'cherry'];
const [a, second] = array;
console.log(`First: ${a}, Second: ${second}`);
