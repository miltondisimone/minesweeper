import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: 'game-setup', component: GameSetupComponent},
  { path: 'game-board', component: GameBoardComponent},
  { path: 'ranking', component: RankingComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'game-setup'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
