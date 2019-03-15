# Minesweeper Flags Extreme

Play here: https://play.minesweeperflags.net

## Developing locally

- Clone project
- Download http://stats.zomis.net/minesweeper-core.js and put it in `src/kotlin/` (this directory does not exist, create it).
- Run `npm install`
- Run `npm run serve` and go to http://localhost:8080

When developing and testing locally you can connect to a server dedicated for testing. No games played there will be saved in the database.

_Note: Connecting to the test-server requires your client to run at localhost:8080._
