/**
 * @typedef AnyTileType
 * @type {'▩' | '◫' | '◪'}
 */
const TileType = {
	HOLE: "▩", // Can't be selected nor covered
	FLOOR: "◫", // Can be selected and need to be covered
	OTHERS: "◪", // Can be selected and don't need to be covered (but can)
}

/**
 * @typedef AnyTileState
 * @type {0 | 1 | 2 | 3}
 */
const TileState = {
	NONE: 0,
	SELECTED: 1,
	COVERED: 2,
}

/**
 * @typedef Tile
 * @property {AnyTileType} type
 * @property {AnyTileState} state It's a bitwise combination
 */

/**
 * @typedef Map
 * @property {Tile[][]} tiles
 */

/**
 * @typedef MapTest
 * @property {AnyTileType[][]} mapTypes
 * @property {AnyTileState[][]} resultStates
 */

/**
 * @typedef MapMatrix
 * @type {(0 | 1)[][]}
 */

/**
 * @function buildMapFromTest
 * @param {MapTest} mapTest 
 * @returns {MapMatrix}
 */
function buildMapMatrixFromTest(mapTest) {
	/** @type {MapMatrix} */
	const map = []
	for (let i = 0; i < mapTest.mapTypes.length; i++) {
		for (let j = 0; j < mapTest.mapTypes[i].length; j++) {
			const pos = i * mapTest.mapTypes[i].length + j
			map[pos] = new Array(mapTest.mapTypes.length * mapTest.mapTypes[i].length).fill(0)

			if (mapTest.mapTypes[i][j] == TileType.FLOOR) {
				if (i > 0 && mapTest.mapTypes[i - 1][j] != TileType.HOLE) {
					const posJ = (i - 1) * mapTest.mapTypes[i].length + j
					map[pos][posJ] = 1
				}

				if (i < mapTest.mapTypes.length - 1 && mapTest.mapTypes[i + 1][j] != TileType.HOLE) {
					const posJ = (i + 1) * mapTest.mapTypes[i].length + j
					map[pos][posJ] = 1
				}

				if (j > 0 && mapTest.mapTypes[i][j - 1] != TileType.HOLE) {
					const posJ = i * mapTest.mapTypes[i].length + j - 1
					map[pos][posJ] = 1
				}

				if (j < mapTest.mapTypes[i].length - 1 && mapTest.mapTypes[i][j + 1] != TileType.HOLE) {
					const posJ = i * mapTest.mapTypes[i].length + j + 1
					map[pos][posJ] = 1
				}
			}

		}
	}
	return map
}

module.exports = {
	buildMapMatrixFromTest
}