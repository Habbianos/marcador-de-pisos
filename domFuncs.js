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
		solution = {
			pts: 0
		};
		logInfo("normal", "Novo formato inserido.");
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
	if (btn_calc.html() == "Parar") {
		btn_calc.elt.click();
	}

	data.html("");

	setTimeout(function() {
		time.html("");
		qtd_select.html("");
		qtd_covered.html("");
		gener_span.html("");
	}, 100);
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
}