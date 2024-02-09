# optimize_script.py
import numpy as np
from ortools.linear_solver import pywraplp
from ortools.init.python import init


def convert_to_list(string):
    # Split the string by commas and convert each substring to an integer
    return [int(num) for num in string.split(',')]


def opti(param1, param2):
    # [START solver]
    # Create the linear solver with the GLOP backend.

    StockBars = convert_to_list(param1)  # [2, 4, 8]
    Cuts = convert_to_list(param2)  # [2, 2]
    Kerf = 0.1

    N = []
    n = [[]]
    cOne = []
    cTwo = []

    MatchingCuts = []
    UniqueLengthStocks = []

   # sorting the bars and cuts from smallest to largest

    StockBars.sort()
    Cuts.sort()

    # remove all stockbars after the total cut requirements are met
    # Get total cut requirement first (allow for Kerf, assume a bar will always be cut from a bigger bar, so will have a kerf)
    TotalCutReq = 0
    for j in range(0, len(Cuts)):
        TotalCutReq += Cuts[j]+2*Kerf

    TotalStock = 0
    for i in range(0, len(StockBars)):
        TotalStock += StockBars[i]

    if TotalCutReq > TotalStock:
        print('Not Enough Material..exiting')
        exit()
    # print(Cuts, StockBars)
   # first remove the stockbars which are smaller than the any cut length needed
    i = 0
    for j in range(0, len(Cuts)):
        while i < len(StockBars):
            if (Cuts[j] > StockBars[i]):
                StockBars.pop(i)
                i -= 1
            i += 1
    # Now iterate through the stockbars and delete the ones when the requirement is met.

    ReqAdd = 0
    for i in range(0, len(StockBars)):
        if (ReqAdd >= TotalCutReq):
            del StockBars[i:len(StockBars)]
            break
        ReqAdd += StockBars[i]

    # print('Going to Process - Cuts: ', Cuts)
    # print('Going to Process - Stock: ', StockBars)
    # print('Going to Process - Kerf: ', Kerf)

    # print(BarCount)#bars will have an index of i
    # print(CutCount)#cuts will have an index of j
    # n is a boolan variable that says if a cut j will be taken from bar i
    # N is a boolean variable that says if a bar is used

    # Give Away the exact lengths
    # print('Give Aways......\n')
    i = 0
    while i < len(StockBars):
        j = 0
        while j < len(Cuts):
            if StockBars[i] == Cuts[j]:  # Found an exact match
                print('Bar length: =', StockBars[i], ' Cuts:')
                print(Cuts[j])
                # remove the cut and bar
                StockBars.pop(i)
                i -= 1
                Cuts.pop(j)
                break
            j += 1
        i += 1
    if len(Cuts) == 0:
        exit()
    # print('\nGoing to Solver - Cuts: ', Cuts)
    # print('Going to Solver - Stock: ', StockBars)
    solver = pywraplp.Solver(
        'MySolver', pywraplp.Solver.BOP_INTEGER_PROGRAMMING)
    # solver = pywraplp.Solver.CreateSolver('My solver', ortools.MPSolver.CBC_MIXED_INTEGER_PROGRAMMING)
    if not solver:
        return
    # [END solver]
    BarCount = len(StockBars)

    CutCount = len(Cuts)
    # [START variables]
    # Create the variables#I matched the variable names to what I used in the handwritten one. To correct
    for i in range(0, BarCount):
        N.append(solver.BoolVar("N"+str(i)))
        n.append([])
        for j in range(0, CutCount):
            n[i].append(solver.BoolVar("n"+str(i)+str(j)))

    # Constraint Type 1
    # Create linear constraint for each bar. Cuts cannot be bigger than the bars
    for i in range(0, BarCount):
        cOne.append(solver.RowConstraint(-solver.infinity(), 0))
        cOne[i].SetCoefficient(N[i], (StockBars[i]+Kerf)*-1)
        for j in range(0, CutCount):
            cOne[i].SetCoefficient(n[i][j], Cuts[j]+Kerf)
    # Constraint Type 2
    # Create linear constraint for each bar. one cut need is fulfilled only once
    # for eact cut loop through all bars
    for j in range(0, CutCount):
        cTwo.append(solver.RowConstraint(1, 1))
        for i in range(0, BarCount):
            cTwo[j].SetCoefficient(n[i][j], 1)

    # print('Number of constraints =', solver.NumConstraints())
    # Now we will create the objective function which is produce all these cuts with minimum bar use
    objective = solver.Objective()
    for i in range(0, BarCount):
        objective.SetCoefficient(N[i], StockBars[i])
    objective.SetMinimization()

    # That's it. Now I will solve
    # print('Number of variables =', solver.NumVariables())

    # [START solve]
    solver.Solve()
    # [END solve]

    # [START print_solution]
    # print('Solution:')
    # print('Objective value =', objective.Value())
    for i in range(0, BarCount):
        if (N[i].solution_value() == 1):
            print('Bar length: =', StockBars[i], 'Cuts: ')
            for j in range(0, CutCount):
                if (n[i][j].solution_value() == 1):
                    print(Cuts[j])

    # [END print_solution]


# Entry point to execute the desired function
if __name__ == "__main__":
    import sys
    init.CppBridge.init_logging("piyas_example.py")
    cpp_flags = init.CppFlags()
    cpp_flags.stderrthreshold = True
    cpp_flags.log_prefix = False
    init.CppBridge.set_flags(cpp_flags)

    # print(type(np.array(sys.argv[1])))
    # Retrieve arguments passed from Node.js
    arg1 = (sys.argv[1])  # Assuming param1 is an integer
    arg2 = (sys.argv[2])  # Assuming param2 is an integer

    # Call the function with provided parameters
    output = opti(arg1, arg2)

    # Print the result to be captured by Node.js
    print(output)
