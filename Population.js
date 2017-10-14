// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

function Population(p, m, num) {

	this.population;                   // Array to hold the current population
	this.matingPool;                   // ArrayList which we will use for our "mating pool"
	this.generations = 0;              // Number of generations
	this.searchSteps = p.length * p[0].length * 4;
	this.limitGenerations = this.searchSteps;
	this.finished = false;             // Are we finished evolving?
	this.font = p;                     // Font matrix
	this.mutationRate = m;             // Mutation rate
	//this.perfectScore = 1;
	this.everPhrase = "";
	this.everRecord = 0.0;
	this.everRecordSelect = 0;
	this.everRecordCovereds = 0;
	this.everRecordUseless = 0;

	this.best = [];

	this.population = [];
	for (let i = 0; i < num; i++) {
		this.population[i] = new DNA(this.font.length, this.font[0].length);
	}
	this.matingPool = [];

	// Fill our fitness array with a value for every member of the population
	this.calcFitness = function() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness(font);
		}
	}
	this.calcFitness();

	// Create a new generation
	this.generate = function() {

		// Calculate the probabilits of all elements
		let sumFitness = 0;
		for (let i = 0; i < this.population.length; i++) {
			sumFitness += this.population[i].fitness;
		}
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].prob = this.population[i].fitness / sumFitness;
		}

		// Generate the children
		let newPopulation = [];
		for (let i = 0; i < this.population.length; i++) {
			let partnerA = this.pickOne();
			let partnerB = this.pickOne();
			let child = partnerA.crossover(partnerB);
			child.mutate(this.mutationRate);
			newPopulation.push(child);
		}
		this.population = newPopulation;


		this.generations++;
	}

	this.pickOne = function() {
		let index = 0;
		let r = random(1);

		while (r > 0) {
			r -= this.population[index].prob;
			index++;
		}
		index--;
		return this.population[index];
	}


	this.getBest = function() {
		//return this.best;
		return this.everPhrase;
	}

	// Compute the current "most fit" member of the population
	this.evaluate = function() {
		let worldrecord = 0.0;
		let index = 0;
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > worldrecord) {
				index = i;
				worldrecord = this.population[i].fitness;
			}
		}
		if (worldrecord > this.everRecord) {
			this.everPhrase = this.population[index].getPhrase();
			this.everRecord = worldrecord;
			this.everRecordSelect = this.population[index].calcSelect();
			this.everRecordCovereds = this.population[index].calcCovereds();
			this.everRecordUseless = this.population[index].calcUseless();

			this.limitGenerations += this.generations + this.searchSteps;
		}

		this.best = this.population[index].getPhrase();
		//if (worldrecord === this.perfectScore) {
		//if (this.generations >= this.limitGenerations) {
		//	this.finished = true;
		//}
	}

	this.isFinished = function() {
		return this.finished;
	}

	this.getGenerations = function() {
		return this.generations;
	}

	// Compute average fitness for the population
	this.getAverageFitness = function() {
		let total = 0;
		for (let i = 0; i < this.population.length; i++) {
			total += this.population[i].fitness;
		}
		return total / (this.population.length);
	}

	this.allPhrases = function() {
		let everything = "";
		
		let displayLimit = min(this.population.length,50);
		
		
		for (let i = 0; i < displayLimit; i++) {
			everything += this.population[i].getPhrase() + "<br>";
		}
		return everything;
	}
}

