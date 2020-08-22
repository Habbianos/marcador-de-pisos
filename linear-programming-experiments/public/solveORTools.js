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
    updateOutput(data, n)
  })
  .catch(err => {
    console.log(err)
  })
}