// Função para selecionar um piso específio (altera os laterais deste)
function selecioneEsse(i, j) {
	// Verifica se é possível selecionar e se ele não já está selecionado
	if (fonte[i][j].type != "▩" && fonte[i][j].state != 3 && fonte[i][j].state != 2) {
		qtdSelect++;

		// Verifica se já está coberto
		fonte[i][j].state == 1 ? fonte[i][j].state = 3 : fonte[i][j].state = 2;

		// Varre todos os laterais deste para marcá-los como cobertos
		var meusLaterais = osLaterais(i, j);
		for (var k = 0; k < meusLaterais.length; k++) {
			// Verifica se há a necessidade de cobrí-lo
			if (fonte[meusLaterais[k].x][meusLaterais[k].y].type == "◫") {
				// Verifica se já está selecionado
				if (fonte[meusLaterais[k].x][meusLaterais[k].y].state == 2)
					fonte[meusLaterais[k].x][meusLaterais[k].y].state = 3;
				else if (fonte[meusLaterais[k].x][meusLaterais[k].y].state != 3)
					fonte[meusLaterais[k].x][meusLaterais[k].y].state = 1;
			}
		}
	}
}

// Função que, a partir dos índices da célula na matriz, retorna um vetor de índices correspondentes aos laterais horizontais e verticais da célula informada
function osLaterais(i, j) {
	// Verifica se a célula informada existe
	if (typeof fonte[i] != "undefined" && typeof fonte[i][j] != "undefined") {
		var laterais = [];
		// Verifica a existência de cada uma das células laterais e as insere no vetor
		if (typeof fonte[i-1] != "undefined" && typeof fonte[i-1][j] != "undefined")
			laterais.push({x: i-1, y: j});
		if (typeof fonte[i+1] != "undefined" && typeof fonte[i+1][j] != "undefined")
			laterais.push({x: i+1, y: j});
		if (typeof fonte[i][j-1] != "undefined")
			laterais.push({x: i, y: j-1});
		if (typeof fonte[i][j+1] != "undefined")
			laterais.push({x: i, y: j+1});
		return laterais;
	} else {
		return false;
	}
}

// Função semelhante à anterior, porém para se obter as células diagonais da célula informada
function osDiagonais(i, j) {
	if (typeof fonte[i] != "undefined" && typeof fonte[i][j] != "undefined") {
		var diagonais = [];
		if (typeof fonte[i-1] != "undefined" && typeof fonte[i-1][j-1] != "undefined")
			diagonais.push({x: i-1, y: j-1});
		if (typeof fonte[i+1] != "undefined" && typeof fonte[i+1][j+1] != "undefined")
			diagonais.push({x: i+1, y: j+1});
		if (typeof fonte[i-1] != "undefined" && typeof fonte[i-1][j+1] != "undefined")
			diagonais.push({x: i-1, y: j+1});
		if (typeof fonte[i+1] != "undefined" && typeof fonte[i+1][j-1] != "undefined")
			diagonais.push({x: i+1, y: j-1});
		return diagonais;
	} else {
		return false;
	}
}

// Função responsável por fazer o embaralhamento do vetor de células descobertas
// Retirada com base neste método: https://goo.gl/EtW5DX
function shuffle() {
	// Função de simples troca de dois elemetos num vetor
	function swap(a, i, j) {
		var temp = a[i];
		a[i] = a[j];
		a[j] = temp;
	}

	// STEP 1
	var largestI = -1;
	for (var i = 0; i < descobertosOrig.length - 1; i++) {
		if ((descobertosOrig[i].x < descobertosOrig[i+1].x) || (descobertosOrig[i].x == descobertosOrig[i+1].x && descobertosOrig[i].y < descobertosOrig[i+1].y)) {
			largestI = i;
		}
	}
	if (largestI == -1) {
		console.log("Finished the Shuffle");
		return false;
	}

	// STEP 2
	var largestJ = [-1, -1];
	for (var j = 0; j < descobertosOrig.length; j++) {

		if ((descobertosOrig[largestI].x < descobertosOrig[j].x)
			|| (descobertosOrig[largestI].x == descobertosOrig[j].x
				&& descobertosOrig[largestI].y < descobertosOrig[j].y)) {
			largestJ = j;
		}
	}

	// STEP 3
	swap(descobertosOrig, largestI, largestJ);

	// STEP 4
	var enddescobertosOrig = descobertosOrig.splice(largestI+1)
	enddescobertosOrig.reverse();
	descobertosOrig = descobertosOrig.concat(enddescobertosOrig);

	return true;
}

function cobreCantos(escolhido) {
	if ([1, 3].indexOf(fonte[escolhido.x][escolhido.y].state) == -1) {
		var qtdCantos = 4;
		var meusDiagonais = osDiagonais(escolhido.x, escolhido.y);

		for (var j = 0; j < meusDiagonais.length; j++) {
			var outroEscolhido = fonte[meusDiagonais[j].x][meusDiagonais[j].y];
			if (outroEscolhido.type == "◫" && (outroEscolhido.state == 0 || outroEscolhido.state == 3))
				qtdCantos--;
		}

		if (qtdCantos >= maxCantos) {
			selecioneEsse(escolhido.x, escolhido.y);
			cobreSelec(escolhido);
		}
	}
}


function qtdPega(i, j) {
	for (var a = 0, meusLaterais = osLaterais(i, j), count = 0; a < meusLaterais.length; a++) {
		if ((fonte[i][j].type == "◫" || fonte[i][j].type == "◪") && (fonte[meusLaterais[a].x][meusLaterais[a].y].type == "◫" || fonte[meusLaterais[a].x][meusLaterais[a].y].state == 2))
			count++;
	}
	return count;
}

function cobreSelec(escolhido) {
	if (fonte[escolhido.x][escolhido.y].state == 2) {
		var meusLaterais = osLaterais(escolhido.x, escolhido.y);

		var melhor = {
			qtd: 0
		};
		for (var j = 0; j < meusLaterais.length; j++) {
			if (qtdPega(meusLaterais[j].x, meusLaterais[j].y) > melhor.qtd) {
				melhor.escolhido = {
					x: meusLaterais[j].x,
					y: meusLaterais[j].y
				};
			}
		}
		selecioneEsse(melhor.escolhido.x, melhor.escolhido.y);
	}
}

self.onmessage = function(e) {
	var fonte = e.data[0];
	var descobertosOrig = e.data[1];

	for (var i = 0; i < fonte.length; i++)
		for (var j = 0; j < fonte[i].length; j++)
			fonte[i][j].state = 0;

	var descobertos = descobertosOrig, qtdSelect = 0;

	var maxCantos = 4;
	while (maxCantos >= 0){
		for (var i = 0; i < descobertos.length; i++) {
			var escolhido = descobertos[i];

			if ([1, 3, 4].indexOf(fonte[escolhido.x][escolhido.y].state) == -1) {
				var qtdCantos = 4;
				var meusDiagonais = osDiagonais(escolhido.x, escolhido.y);

				for (var j = 0; j < meusDiagonais.length; j++) {
					var outroEscolhido = fonte[meusDiagonais[j].x][meusDiagonais[j].y];
					if (outroEscolhido.type == "◫" && (outroEscolhido.state == 0 || outroEscolhido.state == 3))
						qtdCantos--;
				}

				if (qtdCantos >= maxCantos) {
					selecioneEsse(escolhido.x, escolhido.y);
					maxCantos = 4;


					if (fonte[escolhido.x][escolhido.y].state == 2) {
						var meusLaterais = osLaterais(escolhido.x, escolhido.y);

						var melhor = {
							qtd: 0
						};
						for (var j = 0; j < meusLaterais.length; j++) {
							if (qtdPega(meusLaterais[j].x, meusLaterais[j].y) > melhor.qtd) {
							melhor.qtd = qtdPega(meusLaterais[j].x, meusLaterais[j].y);
								melhor.escolhido = {
									x: meusLaterais[j].x,
									y: meusLaterais[j].y
								};
							}
						}

						if (melhor.qtd > 0)
							selecioneEsse(melhor.escolhido.x, melhor.escolhido.y);
						else {
							fonte[escolhido.x][escolhido.y].state = 4;
							qtdSelect--;
						}
					}
				}
			}
		}
		maxCantos--;
	}



	for (let i = 0; i < fonte.length; i++)
		for (let j = 0; j < fonte[i].length; j++) {
			if (fonte[i][j].state == 2 || fonte[i][j].state == 3) {
				let temp = {}; // backup do estado atual
				temp.type = fonte[i][j].type;
				temp.state = fonte[i][j].state;

				let late_temp_loc = osLaterais(i, j); // Localização dos laterais

				// Desselecionando para verificar se há ambiguidade
				switch(fonte[i][j].state) {
					case 2:
						fonte[i][j].state = 0;
						break;
					case 3:
						fonte[i][j].state = 1;
				}
				let ambiguidade = true;

				for (let k = 0; k < late_temp_loc.length && ambiguidade; k++) {
					switch (fonte[late_temp_loc[k].x][late_temp_loc[k].y].state) {
						case 1:
						case 3:
							let late_late_loc = osLaterais(late_temp_loc[k].x, late_temp_loc[k].y); // Localização dos laterias do lateral a ser analizado

							let ainda_coberto = false;
							for (let l = 0; l < late_late_loc.length && !ainda_coberto; l++) {
								switch (fonte[late_late_loc[l].x][late_late_loc[l].y].state) {
									case 2:
									case 3:
										ainda_coberto = true;
								}
							}

							if (!ainda_coberto) {
								ambiguidade = false;
							}
					}
				}

				// Reselecionando caso não havia ambiguidade
				if (!ambiguidade) {
					switch(fonte[i][j].state) {
						case 0:
							fonte[i][j].state = 2;
							break;
						case 1:
							fonte[i][j].state = 3;
					}
				} else
					qtdSelect--;
			}
		}

	self.postMessage([fonte, qtdSelect]);
}