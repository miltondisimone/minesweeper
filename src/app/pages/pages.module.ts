import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [GameSetupComponent, GameBoardComponent, HistoryComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class PagesModule {}
