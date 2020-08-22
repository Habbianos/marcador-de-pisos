from ortools.linear_solver import pywraplp
import sys
import json

solver = pywraplp.Solver.CreateSolver('solve :D', 'CBC')

with open(sys.argv[1], 'r') as file:
    adj = json.loads(file.read())
n = len(adj)
x = {}

for j in range(n):
    x[j] = solver.IntVar(0.0, 1, 'x[%i]' % j)

for row in adj:
    if row:
        solver.Add(sum([1 * x[j] for j in row]) >= 1)

solver.Minimize(solver.Sum([1 * x[j] for j in range(n)]))

status = solver.Solve()

if status == pywraplp.Solver.OPTIMAL:
    print(json.dumps({
        "objectiveValue": solver.Objective().Value(),
        "solution": [x[j].solution_value() for j in range(n)],
        "success": True,
        "numVariables": solver.NumVariables(),
        "numConstraints": solver.NumConstraints(),
        "time": solver.wall_time(),
        "iterations": solver.iterations(),
        "branchAndBoundNodes": solver.nodes()
    }))
else:
    print(json.dumps({
        "success": False
    }))
