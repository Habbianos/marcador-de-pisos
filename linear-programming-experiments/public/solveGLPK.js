function solveGLPK() {
  const start = performance.now()
  const {adjList, n} = getAdjListFromInput()

  clearOutput()

  const problem = `
    Minimize
    obj: ${objective()}

    Subject To
    ${constraints()}

    Bounds
    ${bounds()}

    General
    ${variables()}

    End
  `.replace(/^ +/gm, '')

  let lp = glp_create_prob()
  glp_read_lp_from_string(lp, null, problem)

  glp_scale_prob(lp, GLP_SF_AUTO)

  let smcp = new SMCP({presolve: GLP_ON})
  glp_simplex(lp, smcp)

  let iocp = new IOCP({presolve: GLP_ON})
  glp_intopt(lp, iocp)

  let sol = []
  for(let i = 1; i <= glp_get_num_cols(lp); i++)
    sol[i-1] = glp_mip_col_val(lp, i)
  
  updateOutput(`
    Result: ${glp_mip_obj_val(lp)}
    Time: ${performance.now() - start} ms
    Solution:
    ${arrayToStringMatrix(sol, n)}
  `)

  function objective() {
    let res = ''
    for(let i in adjList)
      res += `+x${i} `
    return res
  }

  function constraints() {
    let res = ``
    adjList.forEach((list, i) => {
      if(!list.length) return
      res += `eq${i}: `
      list.forEach(j => res += `+x${j} `)
      res += `>= 1\n`
    })
    return res
  }

  function bounds() {
    let res = ''
    for(let i in adjList)
      res += `0 <= x${i} <= 1\n`
    return res
  }

  function variables() {
    let res = ''
    for(let i in adjList)
      res += `x${i} `
    return res
  }

}