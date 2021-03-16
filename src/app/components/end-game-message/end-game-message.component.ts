import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-end-game-message',
  templateUrl: './end-game-message.component.html',
  styleUrls: ['./end-game-message.component.scss']
})
export class EndGameMessageComponent implements OnInit {
  @Input() gameResult;

  constructor(private modal: NgbActiveModal) { 
  }

  ngOnInit(): void {
  }

  closeModal(opt) {
    this.modal.close(opt)
  } 

}
