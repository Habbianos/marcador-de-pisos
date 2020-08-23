from ortools.sat.python import cp_model
import sys
import json

model = cp_model.CpModel()

with open(sys.argv[1], 'r') as file:
    adj = json.loads(file.read())
n = len(adj)
x = {}

for j in range(n):
    x[j] = model.NewIntVar(0, 1, 'x[%i]' % j)

for row in adj:
    if row:
        model.Add(sum([1 * x[j] for j in row]) >= 1)

model.Minimize(sum([1 * x[j] for j in range(n)]))

solver = cp_model.CpSolver()

status = solver.Solve(model)

if status == cp_model.OPTIMAL:
    print(json.dumps({
        "objectiveValue": solver.ObjectiveValue(),
        "solution": [solver.Value(x[j]) for j in range(n)],
        "time": solver.WallTime() * 1000,
        "success": True,
    }))
else:
    print(json.dumps({
        "success": False
    }))
