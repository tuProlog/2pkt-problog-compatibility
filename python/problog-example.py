from tuprolog.core import struct, var
from tuprolog.theory.parsing import parse_theory
from tuprolog.solve.plp import solve_options, probability
from tuprolog.solve.problog import problog_solver
from tuprolog.solve.problog.operators import PROBLOG_OPERATORS

probabilisticTheoryText = """
    0.6::edge(1,2).
    0.1::edge(1,3).
    0.4::edge(2,5).
    0.3::edge(2,6).
    0.3::edge(3,4).
    0.8::edge(4,5).
    0.2::edge(5,6).

    path(X,Y) :- edge(X,Y).
    path(X,Y) :- edge(X,Z),Y \\== Z,path(Z,Y).
    """

probabilisticTheory = parse_theory(probabilisticTheoryText, PROBLOG_OPERATORS)
problogSolver = problog_solver(static_kb=probabilisticTheory)

query = struct('path', var('From'), var('To'))

for solution in problogSolver.solve(query, solve_options(lazy=True, probabilistic=True)):
    if solution.is_yes:
        print(f"yes: {solution.solved_query} with probability {probability(solution)}")
