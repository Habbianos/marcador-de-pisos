console.clear();

function insertTextAtCursor(text) {
    var sel, range, textNode;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Move caret to the end of the newly inserted text node
            range.setStart(textNode, textNode.length);
            range.setEnd(textNode, textNode.length);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(text);
    }
}

// Impede que outros caracteres sejam inseridos
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
document.querySelector("#font").addEventListener("focus", function(event){
	this.innerHTML = this.innerHTML.replace(/<span\s*\w*.*?>|<\/span>/gm, "");
	document.querySelector("#qtdSelect").innerHTML = "";
	document.querySelector("#qtdCompleted").innerHTML = "";
	document.querySelector("progress").removeAttribute("value");
	myWorker.terminate();
	document.querySelector("#calc").setAttribute("value", "Calcular");
});

var calcule = false;
document.querySelector("#calc").addEventListener("mousedown", function(){
	document.querySelector("#qtdSelect").innerHTML = "";
});
document.querySelector("#calc").addEventListener("click", function(){
	if (this.getAttribute("value") == "Calcular") {
		calcule = true;
		loadinfos();
		this.setAttribute("value", "Parar");
		document.querySelector("progress").setAttribute("value", 0);
	} else {
		myWorker.terminate();
		this.setAttribute("value", "Calcular");
	}
});

document.querySelector("#clean").addEventListener("click", function() {
	document.querySelector("#font").innerHTML = "";
	document.querySelector("#calc").setAttribute("value", "Calcular");
		
	document.querySelector("#qtdSelect").innerHTML = "";
	document.querySelector("#qtdCompleted").innerHTML = "";
	document.querySelector("progress").removeAttribute("value");
	myWorker.terminate();
})

document.querySelector("#font").addEventListener("input", loadinfos);
		
/*console.log(document.querySelector('script#main-Worker'))
var blob = new Blob(
	Array.prototype.map.call(
		document.querySelectorAll('script[type="text\/js-worker"]#main-Worker'),
		function (oScript) { return oScript.textContent; }
	),
	{ type: 'text/javascript' }
);*/

//var myWorker = new Worker(window.URL.createObjectURL(blob));
var myWorker = new Worker("main-worker.js");

function loadinfos(){
	// console.clear();
	myWorker.terminate();
	myWorker = new Worker("main-worker.js");
	document.querySelector("#qtdSelect").innerHTML = "";
	document.querySelector("#calc").setAttribute("value", "Calcular");
	
	var fonte = document.querySelector("#font").innerHTML;
	if (fonte.search(/[^▩◪◫<br>\n\r]/g) != -1) {
		fonte = fonte.replace(/<\/div><div>|\n/g, "<br>");
		fonte = fonte.replace(/<span\s*\w*.*?>|<\/span>/gm, "");
		fonte = fonte.replace(/a/gm, "▩");
		fonte = fonte.replace(/b(?!r)/gm, "◪");
		fonte = fonte.replace(/c/gm, "◫");
		fonte = fonte.replace(/<\/?div>/gm, "");
		fonte = fonte.replace(/[^▩◪◫\<br\>\n\r]/gm, "");
		//fonte = fonte.replace(/<br><br>/gm, "");
		fonte = fonte.replace(/^<br>/gm, "");
		fonte = fonte.replace(/<br>$/gm, "");
		document.querySelector("#font").innerHTML = fonte;
	}
	
	//var result = document.querySelector("#result");
	fonte = fonte.split("<br>");
	for (var i = 0; i < fonte.length; i++) {
		fonte[i] = fonte[i].split("");
		for (var j = 0; j < fonte[i].length; j++) {
			fonte[i][j] = {
				type: fonte[i][j], 
				state: 0
			};
		}
	}
	
	function pintar() {
		var stringFinal = "";
		for (var i = 0; i < fonte.length; i++) {
			if (i) stringFinal += "<br>";
			for (var j = 0; j < fonte[i].length; j++) {
				if (fonte[i][j].type != "▩") {
					stringFinal += "<span style='color:";
					if (fonte[i][j].state == "2" && fonte[i][j].type == "◫")
						stringFinal += "orange";
					else if (fonte[i][j].state == "3" || (fonte[i][j].state == "2" && fonte[i][j].type == "◪"))
						stringFinal += "red";
					else if (fonte[i][j].state == "4")
						stringFinal += "blue";
					else if (fonte[i][j].state == "1")
						stringFinal += "green";
					else
						stringFinal += "grey";
					stringFinal += "'>";
				}

				stringFinal += fonte[i][j].type;

				if (fonte[i][j].type != "▩")
					stringFinal += "</span>";
			}
		}
		document.querySelector("#font").innerHTML = stringFinal;
	}
	
	if (calcule && window.Worker) {
		calcule = false;
		
		myWorker.postMessage(fonte);
		console.log(5, fonte);
		
		myWorker.onmessage = function(e) {
			if (e.data[0]) {
				fonte = e.data[0] == null ? fonte : e.data[0];
				pintar();
			}
			if (e.data[1])
				document.querySelector("#qtdSelect").innerHTML = e.data[1] + " piso" + (e.data[1] != 1 ? "s" : "") + " selecionado" + (e.data[1] != 1 ? "s" : "");
			
			if (e.data[2] > 100)
				e.data[2] = 100;
			else if (e.data[2] < 0)
				e.data[2] = 0;
			
			document.querySelector("#qtdCompleted").innerHTML = e.data[2] ? e.data[2]+"%" : "Parado em "+document.querySelector("#qtdCompleted").innerHTML;
			if (e.data[2])
				document.querySelector("#qtdCompleted").style.width = "calc("+e.data[2]+"% + 25px)";
			
			if (e.data[2])
				document.querySelector("progress").setAttribute("value", e.data[2]);
			else if (!Number(document.querySelector("progress").getAttribute("value")))
				document.querySelector("progress").removeAttribute("value");
			
			if (e.data[2] == null)
				document.querySelector("#calc").setAttribute("value", "Calcular");
		}
	}
	
	//pintar();
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
