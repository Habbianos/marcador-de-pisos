// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population 
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection 
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function, 
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it 
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//  
//   # Rinse and repeat


//var target;
let font;
let area;
let popmax;
let mutationRate;
let population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
	//frameRate(1);
	bestPhrase = createP("Best phrase:");
	bestPhrase.position(10,10);
	bestPhrase.class("best");

	allPhrases = createP("All phrases:");
	allPhrases.position(600,10);
	allPhrases.class("all");

	stats = createP("Stats");
	stats.position(10,200);
	stats.class("stats");
	
	//createCanvas(640, 360);
	//target = "To be or not to be.";
	font = [
		['c', 'b', 'c', 'c', 'c'],
		['c', 'c', 'c', 'b', 'c']
	];
	font = [
		['a', 'a', 'a', 'a', 'a', 'a', 'a'],
		['a', 'b', 'c', 'c', 'b', 'c', 'a'],
		['a', 'c', 'c', 'c', 'c', 'c', 'a'],
		['a', 'a', 'a', 'c', 'a', 'a', 'a'],
		['a', 'c', 'b', 'c', 'a', 'a', 'a'],
		['a', 'a', 'a', 'a', 'a', 'a', 'a']
	];
	area = calcArea();
	popmax = 200;
	mutationRate = 0.01;

	// Create a population with the font phrase, mutation rate, and population max
	population = new Population(font, mutationRate, popmax);
}

function draw() {
	// Generate mating pool
	population.naturalSelection();
	//Create next generation
	population.generate();
	// Calculate fitness
	population.calcFitness();

	population.evaluate();

	// If we found the target phrase, stop
	if (population.isFinished()) {
		//println(millis()/1000.0);
		noLoop();
	}

	displayInfo();
}

function calcArea() {
	let temp = new Array(font.length);
	
	for (let i = 0; i < temp.length; i++) {
		temp[i] = new Array(font[0].length);

		for (let j = 0; j < temp[0].length; j++) {
			temp[i][j] = font[i][j] == 'a' ? 0 : 1;
		}
	}

	return temp.slice();
}

function displayInfo() {
	// Display current status of population
	var answer = population.getBest();
	
	bestPhrase.html("Best phrase:<br>\t" + answer +
					"<br>Record:<br>\t" + population.everRecord +
					"<br>Select:<br>\t" + population.everRecordSelect +
					"<br>Covereds:<br>\t" + population.everRecordCovereds +
					"<br>Useless:<br>\t" + population.everRecordUseless);
	
	var statstext = "total generations:     " + population.getGenerations() + "<br>";
	statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
	statstext +=    "total population:      " + popmax + "<br>";
	statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";
	
	stats.html(statstext);

	allPhrases.html("All phrases:<br>" + population.allPhrases())
}


