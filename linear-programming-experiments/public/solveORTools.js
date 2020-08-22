function solveORTools() {
  const {adjList, n} = getAdjListFromInput()
  clearOutput()
  console.log(`FETCH /solve`)
  fetch('/solve', {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({adjList})
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let {success, numVariables, numConstraints, time, iterations, branchAndBoundNodes, objectiveValue, solution} = data
    updateOutput(`
      Success: ${success}
      Objective value: ${objectiveValue}
      Time: ${time} ms
      Variables: ${numVariables}
      Constraints: ${numConstraints}
      Iterations: ${iterations}
      Branch and Bound nodes: ${branchAndBoundNodes}
      Solution: 
      ${arrayToStringMatrix(solution, n)}
    `)
  })
  .catch(err => {
    console.log(err)
  })
}