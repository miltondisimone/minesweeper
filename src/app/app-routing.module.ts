import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { GameSetupComponent } from './pages/game-setup/game-setup.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  { path: 'game-setup', component: GameSetupComponent},
  { path: 'game-board', component: GameBoardComponent},
  { path: 'History', component: HistoryComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'game-setup'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
