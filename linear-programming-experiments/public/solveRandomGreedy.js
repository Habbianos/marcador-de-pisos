function solveRandomGreedy(times) {
  const start = performance.now()
  clearOutput()
  
  let res = {resSize: Infinity}
  for(let i = 0; i < times; i++) {
    const newRes = randomGreedy()
    if(newRes.resSize < res.resSize)
      res = newRes
  }

  const {resSize, solution, n} = res

  updateOutput(`
    Result: ${resSize}
    Time: ${performance.now() - start} ms
    Solution:
    ${arrayToStringMatrix(solution, n)}
  `)
}

function randomGreedy() {
  const {adjList, n} = getAdjListFromInput()

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

  return {resSize, n, solution: res}

  function getMaxJ() {
    if(count.filter(c => c > 0).length <= 0)
      return -1
    const maxCount = count.reduce((acc, c) => c > acc ? c : acc, 0)
    const numMaxCounts = count.reduce((acc, c) => acc += c == maxCount, 0)
    const target = Math.floor(Math.random()*numMaxCounts)
    for(let j = 0, founds = 0; j < count.length; j++)
      if(count[j] == maxCount)
        if(founds++ == target) 
          return j
  }
}