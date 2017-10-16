// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function newState() {
	return floor(random(0, 2)); // -1: local inválido; 0: local não selecionado; 1: local selecionado;
}

// Constructor (makes a random DNA)
function DNA(lines, cols) {
	// The genetic sequence
	this.genes = new Array(font.length);
	for (let i = 0; i < this.genes.length; i++) {
		this.genes[i] = new Array(font[i].length);
		for (let j = 0; j < this.genes[i].length; j++) {
			this.genes[i][j] = font[i][j] == '▩' ? -1 : newState(); // Pick a state to the area
		}
	}

	this.fitness = 0;

	// Converts the states array to a String
	this.getPhrase = function() {
		//return [].concat.apply([], this.genes).join();
		return this.genes.toString();
	}

	// Fitness function (returns floating point % of "correct" characters)
	this.calcFitness = function(font) {
		let score = 0;

		// Contagem de quantos foram selecionados (quando menos, melhor)(+10/x)
		let select = this.calcSelect();
		score += 10/pow((select+1), 4);

		// Contagem de quantos foram cobertos (necessariamente todos do estado '◫')(+10x)
		let covereds = this.calcCovereds();
		score += 10*pow(covereds, 4);


		this.fitness = score / (font.length * font[0].length);
		this.fitness = pow(this.fitness, 4);
	}

	this.calcSelect = function() {
		let qtd = 0;

		for (let i = 0; i < this.genes.length; i++) {
			for (let j = 0; j < this.genes[i].length; j++) {
				if (this.genes[i][j] == 1)
					qtd++
			}
		}

		return qtd;
	}

	this.isCovered = function(i, j) {
		if (typeof this.genes[i] != "undefined" && typeof this.genes[i][j] != "undefined" && font[i][j] == '◫') {
			if (typeof this.genes[i-1] != "undefined" && typeof this.genes[i-1][j] != "undefined" && this.genes[i-1][j] == 1) {
				return true;
			}
			else if (typeof this.genes[i+1] != "undefined" && typeof this.genes[i+1][j] != "undefined" && this.genes[i+1][j] == 1) {
				return true;
			}
			else if (typeof this.genes[i][j-1] != "undefined" && this.genes[i][j-1] == 1) {
				return true;
			}
			else if (typeof this.genes[i][j+1] != "undefined" && this.genes[i][j+1] == 1) {
				return true;
			}
		}
		return false;
	}

	this.calcCovereds = function() {
		let qtd = 0;

		for (let i = 0; i < this.genes.length; i++) {
			for (let j = 0; j < this.genes[i].length; j++) {
				if (this.isCovered(i, j)) {
					qtd++;
				}
			}
		}

		return qtd;
	}

	this.reduceUseless = function() {
		for (let i = 0; i < this.genes.length; i++) {
			for (let j = 0; j < this.genes[i].length; j++) {
				if (this.genes[i][j] == 1) {
					let useless = true;
					this.genes[i][j] = 0;

					if (typeof this.genes[i] != "undefined" && typeof this.genes[i][j] != "undefined") {
						if (typeof this.genes[i-1] != "undefined" && typeof this.genes[i-1][j] != "undefined" && font[i-1][j] == '◫' && !this.isCovered(i-1, j))
							useless = false;
						if (typeof this.genes[i+1] != "undefined" && typeof this.genes[i+1][j] != "undefined" && font[i+1][j] == '◫' && !this.isCovered(i+1, j))
							useless = false;
						if (typeof this.genes[i][j-1] != "undefined" && font[i][j-1] == '◫' && !this.isCovered(i, j-1))
							useless = false;
						if (typeof this.genes[i][j+1] != "undefined" && font[i][j+1] == '◫' && !this.isCovered(i, j+1))
							useless = false;
							
						
					} 
					if (!useless)
						this.genes[i][j] = 1;
				}
			}
		}
	}

	// Crossover
	this.crossover = function(partner) {
		// A new child
		let child = new DNA();
		
		//var midpoint = floor(random(this.genes.length)); // Pick a midpoint
		
		// Half from one, half from the other, formming a grid
		for (let i = 0; i < this.genes.length; i++) {
			for (let j = 0; j < this.genes[i].length; j++) {
				if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0) {
					child.genes[i][j] = this.genes[i][j];
				} else {
					child.genes[i][j] = partner.genes[i][j];
				}
			}
		}

		return child;
	}

	// Based on a mutation probability, picks a new random state
	this.mutate = function(mutationRate) {
		for (let i = 0; i < this.genes.length; i++) {
			for (let j = 0; j < this.genes[i].length; j++) {
				if (this.genes[i][j] != -1 && random(1) < mutationRate) {
					this.genes[i][j] = newState();
				}
			}
		}
	}
}
