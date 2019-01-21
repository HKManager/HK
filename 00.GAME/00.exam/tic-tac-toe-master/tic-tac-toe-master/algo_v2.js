// ai player object
// the main function is move
// evaluation function controls is cut off test

function AIPlayer() {

    var seed, oppSeed;

    this.setSeed = function(_seed) {
        seed = _seed;
        oppSeed = _seed === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
    };

    this.getSeed = function() {
        return seed;
    };

    // the core algorithm based on alpha beta pruning
    this.move = function (_data, mode) {
        var statistics = [false, 0, 1, 0, 0, 0, 0, 0];
        // return v and index
        var res = max_value(-1000, 1000, mode, seed, _data, statistics);
        return res.concat(statistics);
    };

    function max_value(alpha, beta, depth, player, _board, statistics) {
        statistics[5]++;
        // if TERMINAL-TEST(state) then return UTILITY(state)
        var nextMoves = getValidMoves(_board);
        if (getValidMoves(_board).length <= 0) {
            statistics[1] = Math.max(statistics[1], statistics[5]);
            statistics[5]--;
            return [evaluate(_board), -1];
        } else if (depth <= 0) {
            statistics[0] = true;
            statistics[1] = Math.max(statistics[1], statistics[5]);
            statistics[5]--;
            return [evaluate(_board), -1];
        }

        var max = [-1000, null];

        // for the next a in ACTIONS(state) do
        for (var i = 0; i < nextMoves.length; i++) {
            var m = nextMoves[i];
            // v ← MAX(v, MIN-VALUE(RESULT(state, a), α, β))
            // generate a node
            statistics[2]++;
            _board[m].set(player);
            var next_move = min_value(alpha, beta, depth-1, player === seed? oppSeed : seed, _board, statistics);
            _board[m].set(Tile.BLANK);

            if (max[1] === null || next_move[0] > max[0]) {
                max[0] = next_move[0];
                max[1] = m;
                alpha = next_move[0];
            }

            // if v ≥ β then return v
            if (alpha >= beta) {
                statistics[3]++;
                statistics[1] = Math.max(statistics[1], statistics[5]);
                statistics[5]--;
                return max;
            }
        }
        statistics[5]--;
        return max;
    }

    function min_value(alpha, beta, depth, player, _board, statistics) {
        statistics[5]++;
        // if TERMINAL-TEST(state) then return UTILITY(state)
        var nextMoves = getValidMoves(_board);
        if (getValidMoves(_board).length <= 0) {
            statistics[1] = Math.max(statistics[1], statistics[5]);
            statistics[5]--;
            return [evaluate(_board), -1];
        } else if (depth <= 0) {
            statistics[0] = true;
            statistics[1] = Math.max(statistics[1], statistics[5]);
            statistics[5]--;
            return [evaluate(_board), -1];
        }

        var min = [1000, null];

        // for the next a in ACTIONS(state) do
        for (var i = 0; i < nextMoves.length; i++) {
            var m = nextMoves[i];
            // v ← MIN(v, MAX-VALUE(RESULT(state, a), α, β))
            // generate a node
            statistics[2]++;
            _board[m].set(player);
            var next_move = max_value(alpha, beta, depth-1, player === seed ? oppSeed : seed, _board, statistics);
            _board[m].set(Tile.BLANK);

            if (min[1] === null || next_move[0] < min[0]) {
                min[0] = next_move[0];
                min[1] = m;
                beta = next_move[0];
            }

            // if v ≤ α then return v
            if (alpha >= beta) {
                statistics[4]++;
                statistics[1] = Math.max(statistics[1], statistics[5]);
                statistics[5]--;
                return min;
            }
        }
        statistics[5]--;
        return min;
    }

    // return a list of tiles are blank
    function getValidMoves(_board) {
        var nm = [];
        for (var i = 0; i < _board.length; i++) {
            if (!_board[i].hasData()) {
                nm.push(i);
            }
        }
        return nm;
    }


    function evaluate(_board) {
        var s = 0;
        s += evaluateLine(_board, [0, 1, 2, 3]);
        s += evaluateLine(_board, [4, 5, 6, 7]);
        s += evaluateLine(_board, [8, 9, 10, 11]);
        s += evaluateLine(_board, [12, 13, 14, 15]);
        s += evaluateLine(_board, [0, 4, 8, 12]);
        s += evaluateLine(_board, [1, 5, 9, 13]);
        s += evaluateLine(_board, [2, 6, 10, 14]);
        s += evaluateLine(_board, [3, 7, 11, 15]);
        s += evaluateLine(_board, [0, 5, 10, 15]);
        s += evaluateLine(_board, [3, 6, 9, 12]);
        return s;
    }

    function evaluateLine(_board, idxs) {
        // A better evaluation function for Tic-Tac-Toe is:
        // +1000 for EACH 4-in-a-line for computer.
        // +100 for EACH 3-in-a-line (with a empty cell) for computer.
        // +10 for EACH 2-in-a-line (with two empty cell) for computer.
        // +1 for EACH 1-in-a-line (with three empty cells) for computer.
        // Negative scores for opponent, i.e., -100, -10, -1 for EACH opponent's 3-in-a-line, 2-in-a-line and 1-in-a-line.
        // 0 otherwise (empty lines or lines with both computer's and opponent's seed).

        var seedN = 0, oppSeedN = 0, emptyN = 0;
        for (var i = 0; i < idxs.length; i++) {
            if (_board[idxs[i]].equals(seed)) seedN++;
            else if (_board[idxs[i]].equals(oppSeed)) oppSeedN++;
            else emptyN++;
        }

        if (seedN === 4) {
            return 8;
        } else if (seedN === 3 && emptyN === 1) {
            return 4;
        } else if (seedN === 2 && emptyN === 2) {
            return 2;
        } else if (seedN === 1 && emptyN === 3) {
            return 1;
        }

        if (oppSeedN === 4) {
            return -8;
        } else if (oppSeedN === 3 && emptyN === 1) {
            return -4;
        } else if (oppSeedN === 2 && emptyN === 2) {
            return  -2;
        } else if (oppSeedN === 1 && emptyN === 3) {
            return  -1;
        }

        return 0;
    }

    var winnigPatterns = (function () {
        var wp = ["1111000000000000",
                "0000111100000000",
                "0000000011110000",
                "0000000000001111",
                "1000100010001000",
                "0100010001000100",
                "0010001000100010",
                "0001000100010001",
                "1000010000100001",
                "0001001001001000"],
            r = new Array(wp.length);

        for (var i = 0; i < wp.length; i++) {
            r[i] = parseInt(wp[i], 2);
        }
        return r;
    })();

    var hasWon = function (_board, player) {
        var p = 0;
        for (var i = 0; i < _board.length; i++) {
            if (_board[i].equals(player)) {
                p |= (1 << i);
            }
        }
        for (var i = 0; i < winnigPatterns.length; i++) {
            var wp = winnigPatterns[i];
            if ((p & wp) === wp) return true;
        }
        return false;
    };

    this.hasWinner = function (_board) {
        if (hasWon(_board, seed)) {
            return seed;
        } else if (hasWon(_board, oppSeed)) {
            return oppSeed;
        } else if (getValidMoves(_board).length === 0) {
            return true;
        }
        return false;
    };
}
