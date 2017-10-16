function ex(n) {
	btnCleanClicked();

	if (n == 1) {
		data.html("◫◪◫◫◫<br>◫◫◫◪◫");
	} else if (n == 2) {
		data.html("▩▩▩▩▩▩▩<br>▩◪◫◫◪◫▩<br>▩◫◫◫◫◫▩<br>▩▩▩◫▩▩▩<br>▩◫◪◫▩<br>▩▩▩▩▩");
	} else if (n == 3) {
		data.html("▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩◫◪▩◫◪▩▩▩◪◪▩▩◪◪▩▩▩▩<br>▩◫▩▩▩▩▩◫▩▩◫▩▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩◫◫◫◫◫◫◫◫▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◪▩▩◪◫◫◫◫◫◫◪▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩▩▩◫◫▩▩▩◫◫◫◫◫◫◫◫▩▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫◫◫◫▩◫◫◫◫◫◪▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫◫◫▩◫▩◫◫▩▩▩<br>▩▩▩▩▩▩▩▩◫▩▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩▩▩▩▩◫◫◫◫◫▩▩▩◫▩◫◫◫◫◫◫▩◪▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫▩▩▩▩▩▩▩▩▩▩<br>▩▩◫▩▩◪◪◫◫◫◪◪▩▩◫▩◫◫◫◫◫◫▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫◫◫▩◫▩◫◫▩▩▩<br>▩▩◫▩▩▩▩◫▩◫▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩◪▩▩▩▩◫▩◫▩▩▩▩▩▩◫◫◫◫◫◪▩◪▩<br>▩▩▩▩▩▩◫◫▩◫◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩");
	}
}

// Converte os caracteres inseridos e impede que outros caracteres sejam inseridos
function dataKeypressEvent(event) {
	let keycode = event.which || event.keyCode;
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
};
// Fired when the DOM of data change and call removeSpans()
function dataDOMChange() {
	if (data.attribute("contenteditable") != null && data.attribute("editing") == null) {
		data.attribute("editing", "");
		
		removeSpans();
		solution = {};
	}
};
// Remove colors
function removeSpans() {
	data.html(data.html().replace(/<span\s*\w*.*?>|<\/span>/gm, ""));
}

// Export the actual solution
function copySolution() {
	if (copyTextToClipboard(JSON.stringify(solution))) {
		select("#exportSoluctionModalLabel").html("Cópia da solução realizada com sucesso");
		select(".modal-body", "#exportSoluctionModal").html("<p>O código da solução encontrada foi copiado para sua área de transferência. Caso não esteja, aqui está o código:</p><pre><code>"+JSON.stringify(solution)+"</code></pre>");
	} else {
		select("#exportSoluctionModalLabel").html("Cópia da solução falhou");
		select(".modal-body", "#exportSoluctionModal").html("<p>Infelimznete o seu navegador não suporta cópia de texto via JavaScript. Selecione o código da solução a seguir e copie você mesmo:</p><pre><code>"+JSON.stringify(solution)+"</code></pre>");
	}
	$("#exportSoluctionModal").modal("show");
}

// Import the solution
function pasteSolution() {
	solution = JSON.parse(document.querySelector("#importSoluctionTextarea").value);
	newBetter(solution.font, solution.matrix, solution.select, solution.covereds);
}

// Start the calcs, or stop
function btnCalcClicked() {
	if (this.html() == "Calcular") {
		loadinfos();
	} else {
		calc = false;
		this.html("Calcular");
		progress.style("width", "0");
		setTimeout(function() {
			status.html("");
		}, 100);
		select("#font").attribute("contenteditable", "");
	}
}

function btnCleanClicked() {
	if (btn_calc.html() == "Parar") {
		btn_calc.elt.click();
	}

	data.html("");

	setTimeout(function() {
		time.html("");
		qtd_select.html("");
		qtd_covered.html("");
	}, 100);
}
