function solveCBC() {
  const {adjList, n} = getAdjListFromInput()
  clearOutput()
  console.log(`FETCH /solve`)
  fetch('/solveCBC', {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({adjList})
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let {success, numVariables, numConstraints, time, objectiveValue, solution} = data
    updateOutput(`
      Result: ${objectiveValue}
      Time: ${time} ms
      Success: ${success}
      Variables: ${numVariables}
      Constraints: ${numConstraints}
      Solution: 
      ${arrayToStringMatrix(solution, n)}
    `)
  })
  .catch(err => {
    console.log(err)
  })
}