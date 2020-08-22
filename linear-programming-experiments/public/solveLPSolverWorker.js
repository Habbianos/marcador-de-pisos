importScripts('lib/javascript-lp-solver.js')
 
onmessage = req => {
  const results = solver.Solve(req.data)
  postMessage(results)
}