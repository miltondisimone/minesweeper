import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { RankingComponent } from './ranking/ranking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameSetupComponent, GameBoardComponent, RankingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
