const input = document.querySelector('#input')
const output = document.querySelector('#output')

input.value = '◫◪◫◫◫\n◫◫▩◪◫'

function getAdjListFromInput() {
  const inputValue = input.value.split('\n')
    .map(s => s.replace(/\s/g, ''))
    .filter(s => s != '')
  let matrix = inputValue
  if(inputValue[0][0] == '[') // if the input string is in array of chars format
    matrix = JSON.parse(inputValue.join(''))
  return {
    adjList: buildAdjListFromTest({mapTypes: matrix}),
    n: matrix[0].length
  }
}

function arrayToStringMatrix(v, n) {
  let res = '', row = []
  for(let i = 0; i < v.length; i++) {
    row.push(v[i])
    if((i+1) % n == 0) {
      res += `${JSON.stringify(row)}\n`
      row = []
    }
  }
  return res
}

function clearOutput() {
  output.textContent = ''
}

function updateOutput(newContent) {
  output.textContent = newContent.replace(/^\s+|\s+$/gm, '')
}
