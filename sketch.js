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


let calc = false;
let log = false;
let font;
let popmax;
let mutationRate;
let population;

var bestPhrase;
var allPhrases;
var stats;

let wantCovered;

function setup() {
	//frameRate(1);
	bestPhrase = createP("");
	bestPhrase.position(10,10);
	bestPhrase.class("best");

	allPhrases = createP("");
	allPhrases.position(600,10);
	allPhrases.class("all");

	stats = createP("");
	stats.position(10,200);
	stats.class("stats");

	noLoop();
}

function draw() {
	if (calc) {
		// Refresh the timer
		population.updateTime();

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

		if (log)
			displayInfo();
	}
}

function displayInfo() {
	// Display current status of population
	var answer = population.getBest();
	
	bestPhrase.html("Best phrase:<br>\t" + answer +
					"<br>Record:<br>\t" + population.everRecord +
					"<br>Select:<br>\t" + population.everRecordSelect +
					"<br>Covereds:<br>\t" + population.everRecordCovereds + " OF " + wantCovered);
	
	var statstext = "Stats<br>total generations:     " + population.getGenerations() + "<br>";
	statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
	statstext +=    "total population:      " + popmax + "<br>";
	statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";
	
	stats.html(statstext);

	//allPhrases.html("All phrases:<br>" + population.allPhrases())
}


