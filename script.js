function teste(n) {
	let obj = document.querySelector("#font");
	if (n == 1) {
		obj.innerHTML = "◫◪◫◫◫<br>◫◫◫◪◫";
	} else if (n == 2) {
		obj.innerHTML = "▩▩▩▩▩▩▩<br>▩◪◫◫◪◫▩<br>▩◫◫◫◫◫▩<br>▩▩▩◫▩▩▩<br>▩◫◪◫▩<br>▩▩▩▩▩";
	} else if (n == 3) {
		obj.innerHTML = "▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩◫◪▩◫◪▩▩▩◪◪▩▩◪◪▩▩▩▩<br>▩◫▩▩▩▩▩◫▩▩◫▩▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩◫◫◫◫◫◫◫◫▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◪▩▩◪◫◫◫◫◫◫◪▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩▩▩◫◫▩▩▩◫◫◫◫◫◫◫◫▩▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫◫◫◫▩◫◫◫◫◫◪▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫◫◫▩◫▩◫◫▩▩▩<br>▩▩▩▩▩▩▩▩◫▩▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩▩▩▩▩◫◫◫◫◫▩▩▩◫▩◫◫◫◫◫◫▩◪▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫▩▩▩▩▩▩▩▩▩▩<br>▩▩◫▩▩◪◪◫◫◫◪◪▩▩◫▩◫◫◫◫◫◫▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫◫◫▩◫▩◫◫▩▩▩<br>▩▩◫▩▩▩▩◫▩◫▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩◪▩▩▩▩◫▩◫▩▩▩▩▩▩◫◫◫◫◫◪▩◪▩<br>▩▩▩▩▩▩◫◫▩◫◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩";
	}

	if (document.querySelector("#calc").innerHTML == "Parar") {
		document.querySelector("#calc").click();
	}

	document.querySelector("#time").innerHTML = "";
	document.querySelector("#qtdSelect").innerHTML = "";
	document.querySelector("#qtdCovered").innerHTML = "";
}

// Converte os caracteres inseridos e impede que outros caracteres sejam inseridos
document.querySelector("#font").addEventListener("keypress", function(event){
	var keycode = event.which || event.keyCode;
	//alert(keycode);
	// 8 -> backspace | 13 -> enter
	// 37 -> left | 38 -> up | 39 -> right | 40 -> down
	// 46 -> delete
	// 97 -> a | 98 -> b | 99 -> c
	// ▩◪◫
	
	switch (keycode) {
		case 97:
			insertTextAtCursor("▩");
			break;
		case 98:
			insertTextAtCursor("◪");
			break;
		case 99:
			insertTextAtCursor("◫");
	}
	
	if ([8, 13, 37, 38, 39, 40, 46].indexOf(keycode) == -1)
		event.preventDefault();
});

observeDOM(document.querySelector("#font"), function() {
	let thiss = document.querySelector("#font");
	if (thiss.hasAttribute("contenteditable") && !thiss.hasAttribute("editing")) {
		thiss.setAttribute("editing", "");
		
		removeSpans();
		solution = {};
	}
});

function removeSpans() {
	document.querySelector("#font").innerHTML = (document.querySelector("#font").innerHTML).replace(/<span\s*\w*.*?>|<\/span>/gm, "");
}


document.querySelector("#copy").addEventListener("click", copySolution);
function copySolution() {
	if (copyTextToClipboard(JSON.stringify(solution))) {
		document.querySelector("#exportSoluctionModalLabel").innerHTML = "Cópia da solução realizada com sucesso";
		document.querySelector("#exportSoluctionModal .modal-body").innerHTML = "<p>O código da solução encontrada foi copiado para sua área de transferência. Caso não esteja, aqui está o código:</p><pre><code>"+JSON.stringify(solution)+"</code></pre>";
	} else {
		document.querySelector("#exportSoluctionModalLabel").innerHTML = "Cópia da solução falhou";
		document.querySelector("#exportSoluctionModal .modal-body").innerHTML = "<p>Infelimznete o seu navegador não suporta cópia de texto via JavaScript. Selecione o código da solução a seguir e copie você mesmo:</p><pre><code>"+JSON.stringify(solution)+"</code></pre>";
	}
	$("#exportSoluctionModal").modal("show");
}
document.querySelector("#paste").addEventListener("click", function(){$("#importSoluctionModal").modal("show");});
document.querySelector("#importSoluctionButton").addEventListener("click", pasteSolution);
function pasteSolution() {
	solution = JSON.parse(document.querySelector("#importSoluctionTextarea").value);
	newBetter(solution.font, solution.phrase, solution.select, solution.covereds);
}

document.querySelector("#calc").addEventListener("click", function(){
	if (this.innerHTML == "Calcular") {
		loadinfos();
	} else {
		noLoop();
		this.innerHTML = "Calcular";
		document.querySelector(".progress-bar").style.width = "0";
		setTimeout(function() {
			document.querySelector("#status").innerHTML = "";
		}, 100);
		document.querySelector("#font").setAttribute("contenteditable", "");
	}
});

document.querySelector("#clean").addEventListener("click", function() {
	if (document.querySelector("#calc").innerHTML == "Parar") {
		document.querySelector("#calc").click();
	}

	document.querySelector("#font").innerHTML = "";

	setTimeout(function() {
		document.querySelector("#time").innerHTML = "";
		document.querySelector("#qtdSelect").innerHTML = "";
		document.querySelector("#qtdCovered").innerHTML = "";
	}, 100);
})


function loadinfos() {

	font = document.querySelector("#font").innerHTML;
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

		document.querySelector("#calc").innerHTML = "Parar";
		document.querySelector(".progress-bar").style.width = "100%";
		document.querySelector("#font").removeAttribute("contenteditable");
		document.querySelector("#font").removeAttribute("editing");

		wantCovered = 0;

		font = font.split("<br>")
		for (let i = 0; i < font.length; i++)
			font[i] = font[i].split("");

		for (let i = 0; i < font.length; i++) {
			for (let j = 0; j < font[i].length; j++) {
				if (font[i][j] == '◫')
					wantCovered++;
			}
		}


		popmax = 200;
		mutationRate = 0.02;

		// Create a population with the font phrase, mutation rate, and population max
		population = new Population(font, mutationRate, popmax);

		calc = true;

		loop();
	}
}


let solution = {};
function newBetter(font, phrase, select, covereds) {
	solution = {
		font: font,
		phrase: phrase,
		select: select,
		covereds: covereds
	};

	document.querySelector("#qtdSelect").innerHTML = select+" selecionados";
	document.querySelector("#qtdCovered").innerHTML = covereds.t+" / "+covereds.a+" cobertos";


	let k = 0; // index of phrase
	let data = phrase.split(",");

	let states = new Array(font.length);
	for (let i = 0; i < font.length; i++) {
		states[i] = new Array(font[i].length);
		for (let j = 0; j < font[i].length; j++) { // ▩◪◫
			if (data[k] == 1)
				states[i][j] = 2;
			else
				states[i][j] = 0;
			k++;
		}
	}
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

	let is_editable = document.querySelector("#font").hasAttribute("contenteditable");
	if (is_editable)
		document.querySelector("#font").removeAttribute("contenteditable");
	document.querySelector("#font").innerHTML = result;
	if (is_editable)
		document.querySelector("#font").setAttribute("contenteditable", "");
}
