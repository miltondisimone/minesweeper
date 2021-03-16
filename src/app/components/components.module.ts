import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndGameMessageComponent } from './end-game-message/end-game-message.component';



@NgModule({
  declarations: [EndGameMessageComponent],
  imports: [
    CommonModule,
  ],
  exports: [EndGameMessageComponent]
})
export class ComponentsModule { }
