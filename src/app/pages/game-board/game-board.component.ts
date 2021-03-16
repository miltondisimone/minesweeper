import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITile } from '../../models/tile.model';
import { difficultySettings} from '../../constants/difficulty-settings.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  tiles: ITile[];

  minesSetted = 0;
  rows: number;
  columns: number;
  mines: number;
  gameOver = false;
  remainingMines: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setDifficulty();
    this.tiles = this.getTotalTiles(this.rows, this.columns);
  }

  getTotalTiles(rows: number, columns: number) {
    let totalTiles = [];

    for (let i = 0; i < rows; i++) {
      totalTiles[i] = [];
      for (let o = 0; o < columns; o++) {
        totalTiles[i][o] = {
          ...{},
          column: i,
          row: o,
          hasMine: false,
          hasFlag: false,
          isDiscovered: false,
          minesAround: 0,
        };
      }
    }

    return totalTiles;
  }

  setDifficulty() {
    const { rows, columns, mines, difficultySelect } = this.activatedRoute.snapshot.params;
    if(difficultySelect === 'custom') {
      this.rows = rows;
      this.columns = columns;
      this.mines = mines;
    } else {
      this.rows = difficultySettings[difficultySelect].rows;
      this.columns = difficultySettings[difficultySelect].columns;
      this.mines = difficultySettings[difficultySelect].mines;
    }
    this.remainingMines = this.mines;
  }

  tileClicked(tile: ITile) {
    if (this.minesSetted < this.mines) {
      tile.isDiscovered = true;
      this.setMines(tile);
    } else {
      if (tile.hasFlag) {
        return;
      }
      if (tile.isDiscovered) {
        return;
      } else {
        tile.isDiscovered = true;
        if (tile.hasMine) {
          this.gameOver = true;
          return;
        }
        this.checkMinesAround(tile);
      }
    }
  }

  checkMinesAround(tile: ITile) {
    for (let i = -1; i < 2; i++) {
      for (let o = -1; o < 2; o++) {
        if (
          this.tiles[tile.column + i] &&
          this.tiles[tile.column + i][tile.row + o] &&
          this.tiles[tile.column + i][tile.row + o].hasMine
        ) {
          tile.minesAround += 1;
        }
      }
    }

    if(!tile.minesAround) {
      for (let i = -1; i < 2; i++) {
        for (let o = -1; o < 2; o++) {
          if (
            this.tiles[tile.column + i] &&
            this.tiles[tile.column + i][tile.row + o]
          ) {
            this.tileClicked(this.tiles[tile.column + i][tile.row + o])
          }
        }
      }
    }
  }

  tileRightClicked($event: MouseEvent, tile: ITile) {
    $event.preventDefault();
    console.log('click derecho', tile);
    if (!tile.isDiscovered) {
      tile.hasFlag = !tile.hasFlag;
    }
    if(tile.hasFlag) {
      this.remainingMines ? this.remainingMines -= 1 : 0;
    }
  }

  private setMines(tile: ITile) {
    const randomRow = this.getRandomInt(0, this.columns);
    const randomCol = this.getRandomInt(0, this.rows);

    if (this.tiles[randomCol][randomRow].isDiscovered) {
      this.setMines(tile);
    } else {
      this.tiles[randomCol][randomRow].hasMine = true;
      this.minesSetted += 1;
      if (this.minesSetted < this.mines) {
        this.setMines(tile);
      } else {
        this.checkMinesAround(tile);
      }
    }
  }

  private getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
