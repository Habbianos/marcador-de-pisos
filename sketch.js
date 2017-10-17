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
	btn_copy,
	btn_paste,
	btn_calc,
	btn_clean,
	status,
	progress,
	time,
	qtd_select,
	qtd_covered,
	data,
	gener_span;

let calc = false;
let font;
let popmax;
let mutationRate;
let population;

var bestMatrix;
var allMatrixs;
var stats;

let wantCovered,
	solution;

let time_init;

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
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	btn_copy = select("#copy");
	btn_copy.mouseClicked(copySolution);

	btn_paste = select("#paste");
	btn_paste.mouseClicked(function(){
		$("#importSoluctionModal").modal("show");
	});
	select("#importSoluctionButton").mouseClicked(pasteSolution);

	btn_calc = select("#calc");
	btn_calc.mouseClicked(btnCalcClicked);

	btn_clean = select("#clean");
	btn_clean.mouseClicked(btnCleanClicked);

	status = select("#status");

	progress = select(".progress-bar");

	time = select("#time");

	qtd_select = select("#qtdSelect");

	qtd_covered = select("#qtdCovered");

	data = select("#font");
	data.elt.addEventListener("keypress", dataKeypressEvent);
	observeDOM(data.elt, dataDOMChange);

	gener_span = select("#generation");

	wantCovered = 0;

	solution = {
		pts: 0
	};

	time_now = 0;

	select("#clear-log").mouseClicked(clearLog);

	select("#max-logs").changed(logInfo);
}

function draw() {
	if (calc) {
		// Refresh the timer
		updateTime();

		//Create next generation
		population.generate();

		// Calculate fitness
		population.calcFitness();

		population.evaluate();

		// If we found the target matrix, stop
		if (population.isFinished()) {
			noLoop();
		}

	} else {
		noLoop();
	}
}


function loadinfos() {

	font = data.html();
	font = font.replace(/^<br>/gm, "");
	font = font.replace(/<br>$/gm, "");
	if (font.search(/[^▩◪◫<br>\n\r]/g) != -1) {
		font = font.replace(/<\/div><div>|\n/g, "<br>");
		font = font.replace(/<span\s*\w*.*?>|<\/span>/gm, "");
		font = font.replace(/a/gm, "▩");
		font = font.replace(/b(?!r)/gm, "◪");
		font = font.replace(/c/gm, "◫");
		font = font.replace(/<\/?div>/gm, "");
		font = font.replace(/[^▩◪◫\<br\>\n\r]/gm, "");
		//font = font.replace(/<br><br>/gm, "");
		document.querySelector("#font").innerHTML = font;
	}
	if (font != "") {

		btn_calc.html("Parar");
		progress.style("width", "100%");
		data.removeAttribute("contenteditable");
		data.removeAttribute("editing");

		// Split the font into a matrix
		font = font.split("<br>")
		for (let i = 0; i < font.length; i++)
			font[i] = font[i].split("");

		// Calculate the total of coverable elements
		wantCovered = 0;
		for (let i = 0; i < font.length; i++) {
			for (let j = 0; j < font[i].length; j++) {
				if (font[i][j] == '◫')
					wantCovered++;
			}
		}

		popmax = 200;			// Total of population
		mutationRate = 0.01;	// Value used to randomly mutation
		solution = {
			pts: 0
		};

		// Create a population with the font matrix, mutation rate, and population max
		population = new Population(font, mutationRate, popmax);


		// Start the calcs
		calc = true;
		loop();

		time_init = new Date().getTime();
	}
}


function newBetter(pts, font, matrix, select, covereds) {
	solution = {
		pts: pts,
		font: font,
		matrix: matrix,
		select: select,
		covereds: covereds
	};

	qtd_select.html(select+" selecionados");
	qtd_covered.html(covereds.t+" / "+covereds.a+" cobertos");


	let k = 0;							// Index to selecteds
	let selecteds = matrix.split(",");	// The solution finded

	// Create the states matrix, marking the selected elements
	let states = new Array(font.length);
	for (let i = 0; i < font.length; i++) {
		states[i] = new Array(font[i].length);
		for (let j = 0; j < font[i].length; j++) {
			if (selecteds[k] == 1)
				states[i][j] = 2;
			else
				states[i][j] = 0;
			k++;
		}

	}
	// In the states matrix, mark the covered (state 1 or 3) or isoled (state 4) elements
	for (let i = 0; i < states.length; i++) {
		for (let j = 0; j < states[i].length; j++) {
			if (states[i][j] == 2 || states[i][j] == 3) {
				if (typeof states[i-1] != "undefined" && typeof states[i-1][j] != "undefined" && font[i-1][j] == '◫') {
					switch (states[i-1][j]) {
						case 0:
							states[i-1][j] = 1;
							break;
						case 2:
							states[i-1][j] = 3;
					}
				}
				if (typeof states[i+1] != "undefined" && typeof states[i+1][j] != "undefined" && font[i+1][j] == '◫') {
					switch (states[i+1][j]) {
						case 0:
							states[i+1][j] = 1;
							break;
						case 2:
							states[i+1][j] = 3;
					}
				}
				if (typeof states[i][j-1] != "undefined" && font[i][j-1] == '◫') {
					switch (states[i][j-1]) {
						case 0:
							states[i][j-1] = 1;
							break;
						case 2:
							states[i][j-1] = 3;
					}
				}
				if (typeof states[i][j+1] != "undefined" && font[i][j+1] == '◫') {
					switch (states[i][j+1]) {
						case 0:
							states[i][j+1] = 1;
							break;
						case 2:
							states[i][j+1] = 3;
					}
				}

			} else if (states[i][j] == 0 && font[i][j] == '◫') {
				let has_neighbor = false
				if (
					(typeof states[i-1] != "undefined" && typeof states[i-1][j] != "undefined" && (font[i-1][j] == '◫' || font[i-1][j] == '◪')) ||
					(typeof states[i+1] != "undefined" && typeof states[i+1][j] != "undefined" && (font[i+1][j] == '◫' || font[i+1][j] == '◪')) ||
					(typeof states[i][j-1] != "undefined" && (font[i][j-1] == '◫' || font[i][j-1] == '◪')) ||
					(typeof states[i][j+1] != "undefined" && (font[i][j+1] == '◫' || font[i][j+1] == '◪'))
				) {
					has_neighbor = true;
				}
				if (!has_neighbor)
					states[i][j] = 4;
			}
		}
	}

	// Transform the states into colors
	let result = "";
	for (let i = 0; i < states.length; i++) {
		for (let j = 0; j < states[i].length; j++) {
			if (states[i][j] == 1)
				result += "<span style=\"color: green\">"+font[i][j]+"</span>"
			else if (states[i][j] == 2)
				result += "<span style=\"color: orange\">"+font[i][j]+"</span>"
			else if (states[i][j] == 3)
				result += "<span style=\"color: red\">"+font[i][j]+"</span>"
			else if (states[i][j] == 4)
				result += "<span style=\"color: blue\">"+font[i][j]+"</span>"
			else
				result += font[i][j];
		}
		result += "<br>";
	}

	let was_editable = (data.attribute("contenteditable") != null);
	if (was_editable)
		data.removeAttribute("contenteditable");

	data.html(result);

	if (was_editable)
		data.attribute("contenteditable", "");
}
