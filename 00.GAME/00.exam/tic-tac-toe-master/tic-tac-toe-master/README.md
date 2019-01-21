# Tic Tac Toe (pure html5)

## Demo
https://cixuuz.github.io/game/tic-tac-toe/v1.html
https://cixuuz.github.io/game/tic-tac-toe/v2.html

![](http://on30xvavr.bkt.clouddn.com/tic-tac-toe_demo_1.png)
![](http://on30xvavr.bkt.clouddn.com/tic-tac-toe_demo_2.png)
![](http://on30xvavr.bkt.clouddn.com/tic-tac-toe_demo_3.png)

## Instructions
Download and open v1.html/v2.html in browser (test on chrome, safari), and play!

## A high-level description of program design
Language: javascript
Project structure:
-- tic-tac-toe
  -- game.js
  -- index.html
  -- state.js
  -- algo.js

where:
1. index.html is the front page of this game, which provides a user interface in any modern browser. Only tested in chrome and safari.
2. state.js is the state manager for menu, game and about interface. It also renders and updates the objects in canvas.
3. game.js includes all objects.
4. algo.js includes AI behaviors powered by alpha beta algorithms.

The level of hardness is implemented by the depth. EASY = 1, MID = 4, HARD = 7.

The average time consumed is less than 10 seconds.

In bonus.html, new evaluation function =
+1000 for EACH 4-in-a-line for computer.
+100 for EACH 3-in-a-line (with a empty cell) for computer.
+10 for EACH 2-in-a-line (with two empty cell) for computer.
+1 for EACH 1-in-a-line (with three empty cells) for computer.
Negative scores for opponent, i.e., -100, -10, -1 for EACH opponent's 3-in-a-line, 2-in-a-line and 1-in-a-line.
0 otherwise (empty lines or lines with both computer's and opponent's seed).
