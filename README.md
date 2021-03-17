# MinesweeperChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## GAME RULES

The game consists of discovering which tiles have mines.

Your first click is totally mine FREE! this means you can't loose by chance at the start. Once you choose a tile, the mines will be generated randomly and the counter starts to run. 

When you click a tile that contain a mine, you automatically loose the game.

When you click on a tile that doesn't contain mines in the adjacents tiles, those will be discovered. If the tile have mines around it, this will be displayed in a number inside the clicked tile.

To defuse mines, you have to put a red flag in the tile by pressing the right click.

If you press right click on a discovered tile, this is going to check the adjacent tiles. If any of those doesn't contain mines, they will be discovered. Otherwise, nothing happens.

You can check how many mines are still to be defused above the board.

You win the game once you have all the mines with a red flag put it on the tile.