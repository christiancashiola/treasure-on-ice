# TODOs

- sounds......................`2-3hr`
- seo.........................`1hr`
- social links.......`1hr`
- update personal site.......`1hr`
- add lives
- check memos
- refactor usegame state to pass methods directly to player - IT gens pieces, not Level
- Readme

# Phase 2 (optional)

- error handling
- slide off one side and come out the other
- level generator using maze runner algorithm w/ difficulty rankings
- teleport/warp squares
- moving enemies
- different textures for each level
- refactor Movable piece
- do we need collisions to be this.gamePieces?
- add special ending

# Highlights

React profiling to view re-renders
Only repaints parts of the canvas that need to, not the entire canvas

# Bug Bash Test Cases

1. Verify timer turns yellow if < 1m is remaining (only numbers change colors)
2. Verify timer turns red if < 30s are remaining (only numbers change colors)
3. Verify timer @#$%!!! shows up for a split second when time runs out
4. Verify score is calculated correctly on level summary: (level _ lives _ remaining seconds \* 1000) / 120
5. Verify that a random motivational message is shown after score is calculated--intentional delay between calculation complete and message
6. Verify button text in level summary is accurate
7. Verify routing between main menu and instructions and back works
8. Verify routing between main menu and game and level summary and game works
9. Verify running out of lives ends game
10. Verify running out of time ends game
11. Verify lives remain same between levels
12. Verify game over screen text and score accuracy
13. Verify initials submission form
14. Verify lives turns yellow if 2 lives are left (only emoji changes colors)
15. Verify lives turns red if 1 life is left (only emoji changes colors)

- Verify everything again on mobile device
