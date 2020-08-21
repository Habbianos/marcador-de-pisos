from ortools.linear_solver import pywraplp
import sys
import json

solver = pywraplp.Solver.CreateSolver('solve :D', 'CBC')

with open(sys.argv[1], 'r') as file:
    A = json.loads(file.read())
m = len(A)
n = len(A[0])
x = {}
for j in range(n):
    x[j] = solver.IntVar(0.0, 1, 'x[%i]' % j)

# for i in range(m):
#     if sum(A[i]) > 0:
#         constraint_expr = [A[i][j] * x[j] for j in range(n)]
#         solver.Add(sum(constraint_expr) >= 1)

# very faster than the above :D
for i in range(m):
    if sum(A[i]) > 0:
        filteredA = []
        filteredX = []
        for j in range(n):
            if(A[i][j] != 0):
                filteredA.append(A[i][j])
                filteredX.append(x[j])
        constraint_expr = [filteredA[j] * filteredX[j] for j in range(len(filteredA))]
        solver.Add(sum(constraint_expr) >= 1)

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
