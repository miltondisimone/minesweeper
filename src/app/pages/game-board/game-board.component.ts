import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITile } from '../../models/tile.model';
import { difficultySettings } from '../../constants/difficulty-settings.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndGameMessageComponent } from 'src/app/components/end-game-message/end-game-message.component';
import { HistoryService } from 'src/app/services/history.service';

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
  minesDefused = 0;
  timeElapsed = 0;
  interval;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private historyService: HistoryService
  ) {}

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
    const {
      rows,
      columns,
      mines,
      difficultySelect,
    } = this.activatedRoute.snapshot.params;
    if (difficultySelect === 'custom') {
      this.rows = Number(rows);
      this.columns = Number(columns);
      this.mines = Number(mines);
    } else {
      this.rows = Number(difficultySettings[difficultySelect].rows);
      this.columns = Number(difficultySettings[difficultySelect].columns);
      this.mines = Number(difficultySettings[difficultySelect].mines);
    }
    this.remainingMines = this.mines;
  }

  tileClicked(tile: ITile) {
    if (this.minesSetted < this.mines) {
      tile.isDiscovered = true;
      this.setMines(tile);
      this.startTimer();
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
          this.openEndMessageModal('You loose!');
          clearInterval(this.interval);
          const match = { result: 'Lost', time: this.timeElapsed };
          this.historyService.saveHistory(match);
          return;
        }
        this.checkMinesAround(tile);
      }
    }
  }

  checkMinesAround(tile: ITile) {
    tile.minesAround = 0;
    tile.minesAroundCovered = 0;

    for (let i = -1; i < 2; i++) {
      for (let o = -1; o < 2; o++) {
        if (
          this.tiles[tile.column + i] &&
          this.tiles[tile.column + i][tile.row + o] &&
          this.tiles[tile.column + i][tile.row + o].hasMine
        ) {
          tile.minesAround += 1;
          if(this.tiles[tile.column + i][tile.row + o].hasFlag) {
            tile.minesAroundCovered += 1;
          }
        }
      }
    }

    if (!tile.minesAround || tile.minesAround === tile.minesAroundCovered) {
      for (let i = -1; i < 2; i++) {
        for (let o = -1; o < 2; o++) {
          if (
            this.tiles[tile.column + i] &&
            this.tiles[tile.column + i][tile.row + o]
          ) {
            this.tileClicked(this.tiles[tile.column + i][tile.row + o]);
          }
        }
      }
    }
    this.checkGameStatus();
  }

  tileRightClicked($event: MouseEvent, tile: ITile) {
    $event.preventDefault();
    if (!tile.isDiscovered) {
      tile.hasFlag = !tile.hasFlag;
      tile.hasFlag ? (this.remainingMines -= 1) : (this.remainingMines += 1);
      if (tile.hasFlag && tile.hasMine) {
        this.minesDefused += 1;
      } else if (!tile.hasFlag && tile.hasMine) {
        this.minesDefused -= 1;
      }
      this.checkGameStatus();
    } else {
      this.checkTilesAround(tile);
    }
  }

  checkTilesAround(tile: ITile) {
    this.checkMinesAround(tile);
  }

  openEndMessageModal(gameResult: string) {
    const modalRef = this.modalService.open(EndGameMessageComponent);

    modalRef.componentInstance.gameResult = gameResult;

    modalRef.result.then(
      (result) => {
        result === 'retry'
          ? window.location.reload()
          : this.router.navigate(['game-setup']);
      },
      () => {
        this.router.navigate(['game-setup']);
      }
    );
  }

  private checkGameStatus() {
    if (this.minesDefused === this.mines) {
      this.openEndMessageModal('You win!');
      clearInterval(this.interval);
      const match = { result: 'Won', time: this.timeElapsed };
      this.historyService.saveHistory(match);
    }
  }

  private setMines(tile: ITile) {
    const randomCol = this.getRandomInt(0, this.columns);
    const randomRow = this.getRandomInt(0, this.rows);

    if (this.tiles[randomCol][randomRow] === tile ||  this.tiles[randomCol][randomRow].hasMine) {
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

  private startTimer() {
    this.interval = setInterval(() => {
      this.timeElapsed += 1;
    }, 1000);
  }
}
