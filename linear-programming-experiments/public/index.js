const input = document.querySelector('#input')
const output = document.querySelector('#output')

input.value = '◫◪◫◫◫\n◫◫▩◪◫'

function getAdjListFromInput() {
  const matrix = input.value.split('\n')
    .map(s => s.replace(/\s/g, ''))
    .filter(s => s != '')
  return {
    adjList: buildAdjListFromTest({
      mapTypes: matrix
    }),
    n: matrix[0].length
  }
}

function chunk(list, n) {
  return Array(Math.ceil(list.length / n))
    .fill()
    .map((_, i) => list.slice(i * n, i * n + n))
}

function arrayToStringMatrix(v, n) {
  const r = chunk(v, n)
  const s = input.value.split('\n')
    .map(s => s.replace(/\s/g, ''))
    .filter(s => s != '')
    .map(s => s.split(""))
  return paint(s, r)
}

function clearOutput() {
  output.textContent = ''
}

function updateOutput(newContent) {
  output.innerHTML = newContent.replace(/^\s+|\s+$/gm, '')
}