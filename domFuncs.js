function ex(n) {
	btnCleanClicked();

	if (n == 1) {
		data.html("◫◪◫◫◫<br>◫◫◫◪◫");
	} else if (n == 2) {
		data.html("▩▩▩▩▩▩▩<br>▩◪◫◫◪◫▩<br>▩◫◫◫◫◫▩<br>▩▩▩◫▩▩▩<br>▩◫◪◫▩<br>▩▩▩▩▩");
	} else if (n == 3) {
		data.html("▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩◫▩▩▩▩▩◫◪▩◫◪▩▩▩◪◪▩▩◪◪▩▩▩▩<br>▩◫▩▩▩▩▩◫▩▩◫▩▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩▩◫▩▩▩◫▩▩▩▩▩<br>▩▩▩▩▩◫◫◫◫◫◫◫◫▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◪▩▩◪◫◫◫◫◫◫◪▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫◪◫◫◫◪▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫▩▩◫◫◫▩◫◫◫▩▩▩▩<br>▩▩▩▩▩▩▩▩◫◫▩▩▩◫◫◫◫◫◫◫◫▩▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩◫◫◫◫◫◫◫◫◫▩◫◫◫◫◫◪▩▩▩<br>▩◪◪◪◪◪◫◫◫◫◫◫◫◫◫◫◫▩◫▩◫◫▩▩▩<br>▩▩▩▩▩▩▩▩◫▩▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩▩▩▩▩◫◫◫◫◫▩▩▩◫▩◫◫◫◫◫◫▩◪▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫▩▩▩▩▩▩▩▩▩▩<br>▩▩◫▩▩◪◪◫◫◫◪◪▩▩◫▩◫◫◫◫◫◫▩▩▩<br>▩▩◫▩▩▩◫◫◫◫◫▩▩▩◫◫◫▩◫▩◫◫▩▩▩<br>▩▩◫▩▩▩▩◫▩◫▩▩▩▩◫◫◫▩◫▩◫◫◫◫▩<br>▩▩◪▩▩▩▩◫▩◫▩▩▩▩▩▩◫◫◫◫◫◪▩◪▩<br>▩▩▩▩▩▩◫◫▩◫◫▩▩▩▩▩▩▩▩▩▩▩▩▩▩<br>▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩");
	}

	logInfo("normal", "Exemplo inserido.");
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
	if (data.elt == document.activeElement && data.attribute("editing") == null && data.html() != "") {

		logInfo("normal", "Novo formato inserido.");

		data.attribute("editing", "");

		removeSpans();
		solution[solution.length] = {
			pts: 0
		};
	}
};
// Remove colors
function removeSpans() {
	if (data.attribute("colored") != null) {
		logInfo("stop", "Coloração removida.");
		data.html(data.html().replace(/<span\s*\w*.*?>|<\/span>/gm, ""));
		data.removeAttribute("colored");
	}
}

// Export the actual solution
function copySolution(solution_id) {
	if (copyTextToClipboard(JSON.stringify(solution[solution_id]))) {
		select("#exportSoluctionModalLabel").html("Cópia da solução realizada com sucesso");
		select(".modal-body", "#exportSoluctionModal").html("<p>O código da solução encontrada foi copiado para sua área de transferência. Caso não esteja, aqui está o código:</p><pre><code>"+JSON.stringify(solution[solution_id])+"</code></pre>");
	} else {
		select("#exportSoluctionModalLabel").html("Cópia da solução falhou");
		select(".modal-body", "#exportSoluctionModal").html("<p>Infelimznete o seu navegador não suporta cópia de texto via JavaScript. Selecione o código da solução a seguir e copie você mesmo:</p><pre><code>"+JSON.stringify(solution[solution_id])+"</code></pre>");
	}
	$("#exportSoluctionModal").modal("show");
	logInfo("normal", "Solução exportada.");
}

// Import the solution
function pasteSolution() {
	if (btn_calc.html() == "Parar") {
		btn_calc.elt.click();
	}

	solution[solution.length] = JSON.parse(document.querySelector("#importSoluctionTextarea").value);

	logInfo("normal", "Solução importada.");

	newBetter(solution[solution.length - 1].pts, solution[solution.length - 1].font, solution[solution.length - 1].matrix, solution[solution.length - 1].select, solution[solution.length - 1].covereds);
}

// Start the calcs, or stop
function btnCalcClicked() {
	if (this.html() == "Calcular") {
		loadinfos();
	} else {
		logInfo("stop", "Cálculos interrompidos.");

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
	if (data.html() != "" || time.html() != "" || qtd_select.html() != "" || qtd_covered.html() != "" || gener_span.html() != "0") {
		if (btn_calc.html() == "Parar") {
			btn_calc.elt.click();
		}

		data.html("");

		setTimeout(function() {
			time.html("");
			qtd_select.html("");
			qtd_covered.html("");
			gener_span.html("0");
		}, 100);

		data.removeAttribute("editing");

		logInfo("stop", "Informações removidas.");
	} else {
		logInfo("stop", "As informações já foram removidas.");
	}
}

function formatTime(t, n) {
	return ("0000" + t).slice(-n);
}

function updateTime() {
	let time_now = (new Date().getTime()) - time_init;

	time.html(
		(time_now > 3600000 ? formatTime(floor(time_now / 3600000 % 24), 2) + ":" : "") + // Hours
		(time_now > 60000 ? formatTime(floor(time_now / 60000 % 60), 2) + ":" : "") + // Minutes
		(time_now > 1000 ? formatTime(floor(time_now / 1000 % 60), 2) + ":" : "") + // Seconds
		formatTime(time_now % 1000, 3) // Miliseconds
	);

	if (time_now < 5000)
		status.html("Procurando");
	else if (time_now < 10000)
		status.html("Procurando.");
	else if (time_now < 20000)
		status.html("Procurando..");
	else if (time_now < 40000)
		status.html("Procurando...");
	else if (time_now < 80000)
		status.html("Procurando....");
	else if (time_now < 160000)
		status.html("Procurando.....");
	else if (time_now < 320000)
		status.html("Procurando.....");
}

function logInfo(type, text) {
	if (text != undefined) {
		var new_log = createSpan(text);
		new_log.addClass("log");
		new_log.addClass(type);

		let date = new Date();
		let timestamp = createSpan(("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) + ":" + ("00" + date.getMilliseconds()).slice(-3));
		timestamp.addClass("data-timestamp");
		new_log.child(timestamp)
	}

	let logs = selectAll(".log");
	let max_log = select("#max-logs");
	while ((Number(max_log.value()) > 0 && logs.length > Number(max_log.value())) || logs.length >= 50) {
		let removing_log = select(".log");
		if (removing_log);
			removing_log.remove();
		logs = selectAll(".log");
	}

	if (text != undefined) {
		select("#log-body").child(new_log);
	}

	scrollToBottom("log-body");
}
function clearLog() {
	select("#log-body").html("");
	logInfo("normal", "Registros excluídos.");
}