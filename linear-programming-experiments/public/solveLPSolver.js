function solveLPSolver() {
  const start = performance.now()
  const {adjList, n} = getAdjListFromInput()

  clearOutput()

  const model = {
    optimize: 'n',
    opType: 'min',
    constraints: {},
    variables: {},
    ints: {}
  }

  adjList.forEach((list, i) => {
    if(!list.length) return
    model.constraints[i] = {min: 1}
    for(let j of list) {
      if(!model.variables[j]) {
        model.variables[j] = {n: 1}
        model.ints[j] = 1
      }
      model.variables[j][i] = 1
    }
  })

  const worker = new Worker('solveLPSolverWorker.js')

  worker.onmessage = res => {
    const {data} = res
    updateOutput(`
      Feasible: ${data.feasible}
      Result: ${data.result}
      Time: ${performance.now() - start} ms
      Bounded: ${data.bounded}
      Is integral: ${data.isIntegral}
      Solution:
      ${parseSolution(data, n)}
    `)

    function parseSolution(data, n) {
      let sol = []
      for(let i = 0; i < adjList.length; i++)
        sol[i] = data[i] ? data[i] : 0
      return arrayToStringMatrix(sol, n)
    }
  }

  worker.postMessage(model)
}
