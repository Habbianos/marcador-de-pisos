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

// DOM elements
let btn_ex = new Array(3),
	data,
	time,
	qtd_select,
	qtd_covered,
	btn_calc,
	btn_clean,
	progress,
	status;

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
	noCanvas();
	noLoop();

	btn_ex[0] = select(".btn-1");
	btn_ex[1] = select(".btn-2");
	btn_ex[2] = select(".btn-3");
	for (let i = 0; i < btn_ex.length; i++)
		btn_ex[i].mouseClicked(function() {
			ex(i+1);
		});

	data = select("#font");

	time = select("#time");

	qtd_select = select("#qtdSelect");

	qtd_covered = select("#qtdCovered");

	btn_calc = select("#calc");
	btn_calc.mouseClicked(btnCalcClicked);

	btn_clean = select("#clean");

	progress = select(".progress-bar");

	status = select("#status");
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
	} else
		noLoop();
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


