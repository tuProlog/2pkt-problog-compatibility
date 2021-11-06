import _core from "@tuprolog/2p-core"
import _plp from "@tuprolog/2p-solve-plp"
import _problog from "@tuprolog/2p-solve-problog"
import _solve from "@tuprolog/2p-solve"
import _parsing from "@tuprolog/2p-parser-theory"
import _theory from "@tuprolog/2p-theory"


const { Scope } = _core.it.unibo.tuprolog.core
const { probability, probabilistic } = _plp.it.unibo.tuprolog.solve
const { PROBLOG_OPERATORS } = _problog.it.unibo.tuprolog.solve.problog
const { Solver, SolveOptions } = _solve.it.unibo.tuprolog.solve
const { ClausesParser } = _parsing.it.unibo.tuprolog.theory.parsing

const theoryText = `
0.6::edge(1,2).
0.1::edge(1,3).
0.4::edge(2,5).
0.3::edge(2,6).
0.3::edge(3,4).
0.8::edge(4,5).
0.2::edge(5,6).

path(X,Y) :- edge(X,Y).
path(X,Y) :- edge(X,Z),Y \\== Z,path(Z,Y).
`

const clausesParser = ClausesParser.Companion.withOperatorSet(PROBLOG_OPERATORS)
const scope = Scope.Companion.empty()
const probabilisticTheory = clausesParser.parseTheory(theoryText)
const problogSolver = Solver.Companion.problog.solverWithDefaultBuiltinsAndStaticKB(probabilisticTheory);
const query = scope.structOf("path", [scope.varOf("From"), scope.varOf("To")])
const options = probabilistic(SolveOptions.Companion.allLazily())
const si = problogSolver.solveWithOptions(query, options).iterator()

while (si.hasNext()) {
    let solution = si.next();
    if (solution.isYes) {
        console.log(`yes: ${solution.solvedQuery} with probability ${probability(solution)}`)
    }
}
