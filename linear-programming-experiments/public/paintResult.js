/**
 * 
 * @param {("▩" | "◪" | "◫")[][]} source 
 * @param {(0 | 1)[][]} selected 
 */
function paint(source, selected) {
	// Create the states matrix, marking the selected elements

	/** @type {(0 | 1 | 2 | 3 | 4)[][]}
	 *  @description 0: default | 1: covered | 2: selected | 3: covered and selected | 4: isolated */
	const states = []
	for (let i = 0; i < source.length; i++) {
		states[i] = new Array(source[i].length);
		for (let j = 0; j < source[i].length; j++) {
			if (selected[i][j] == 1)
				states[i][j] = 2;
			else
				states[i][j] = 0;
		}
	}

	const wantShowCoverage = document.querySelector('#showCoverage').checked

	// In the states matrix, mark the covered (state 1 or 3) or isolated (state 4) elements

	for (let i = 0; wantShowCoverage && i < states.length; i++) {
		for (let j = 0; j < states[i].length; j++) {
			if (states[i][j] == 2 || states[i][j] == 3) {
				if (typeof states[i - 1] != "undefined" && typeof states[i - 1][j] != "undefined" && source[i - 1][j] == '◫') {
					switch (states[i - 1][j]) {
						case 0:
							states[i - 1][j] = 1;
							break;
						case 2:
							states[i - 1][j] = 3;
					}
				}
				if (typeof states[i + 1] != "undefined" && typeof states[i + 1][j] != "undefined" && source[i + 1][j] == '◫') {
					switch (states[i + 1][j]) {
						case 0:
							states[i + 1][j] = 1;
							break;
						case 2:
							states[i + 1][j] = 3;
					}
				}
				if (typeof states[i][j - 1] != "undefined" && source[i][j - 1] == '◫') {
					switch (states[i][j - 1]) {
						case 0:
							states[i][j - 1] = 1;
							break;
						case 2:
							states[i][j - 1] = 3;
					}
				}
				if (typeof states[i][j + 1] != "undefined" && source[i][j + 1] == '◫') {
					switch (states[i][j + 1]) {
						case 0:
							states[i][j + 1] = 1;
							break;
						case 2:
							states[i][j + 1] = 3;
					}
				}

			} else if (states[i][j] == 0 && source[i][j] == '◫') {
				let has_neighbor = false
				if (
					(typeof states[i - 1] != "undefined" && typeof states[i - 1][j] != "undefined" && (source[i - 1][j] == '◫' || source[i - 1][j] == '◪')) ||
					(typeof states[i + 1] != "undefined" && typeof states[i + 1][j] != "undefined" && (source[i + 1][j] == '◫' || source[i + 1][j] == '◪')) ||
					(typeof states[i][j - 1] != "undefined" && (source[i][j - 1] == '◫' || source[i][j - 1] == '◪')) ||
					(typeof states[i][j + 1] != "undefined" && (source[i][j + 1] == '◫' || source[i][j + 1] == '◪'))
				) {
					has_neighbor = true;
				}
				if (!has_neighbor)
					states[i][j] = 4;
			}
		}
	}

	// Convert the state matrix into colored string

	return source.map(
		(c, i) => c.map(
			(e, j) => {
				return states[i][j] ? (
					(
						`<span style="color: ${states[i][j]}">${e}</span>`
					).replace('1', 'green')
					.replace('2', 'orange')
					.replace('3', 'red')
					.replace('4', 'blue')
				) : e
			}
		).join('').concat('<br>')
	).join('')
}