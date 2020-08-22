function solveGreedy() {
  const start = performance.now()
  const {adjList, n} = getAdjListFromInput()
  
  clearOutput()

  const count = Array(adjList.length).fill(0)
  adjList.forEach(list => list.forEach(j => count[j]++))

  let res = Array(adjList.length).fill(0), resSize = 0, j
  while((j = getMaxJ()) != -1) {
    resSize++, res[j] = 1
    adjList.forEach(list => {
      if(list.includes(j)) {
        list.forEach(k => count[k]--)
        list.length = 0
      }
    })
  }

  updateOutput(`
    Result: ${resSize}
    Time: ${performance.now() - start} ms
    Solution:
    ${arrayToStringMatrix(res, n)}
  `)

  function getMaxJ() {
    if(count.filter(c => c > 0).length <= 0)
      return -1
    let maxJ = 0
    for(let j = 0; j < count.length; j++)
      if(count[j] > count[maxJ])
        maxJ = j
    return maxJ
  }

}