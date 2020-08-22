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

  const res = solver.Solve(model)

  updateOutput(`
    Feasible: ${res.feasible}
    Result: ${res.result}
    Time: ${performance.now() - start} ms
    Bounded: ${res.bounded}
    Is integral: ${res.isIntegral}
    Solution:
    ${parseSolution(res, n)}
  `)

  function parseSolution(res, n) {
    let sol = []
    for(let i = 0; i < adjList.length; i++)
      sol[i] = res[i] ? res[i] : 0
    return arrayToStringMatrix(sol, n)
  }
}
