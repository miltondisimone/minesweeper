import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {

  difficultyForm = new FormGroup({
    difficultySelect: new FormControl('medium'),
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.difficultyForm.value.difficultySelect.oncha
  }

  startGame() {
    this.router.navigate(['game-board', this.difficultyForm.value]);
  }

  updateDifficultyForm(difficulty: string) {
    if (difficulty === 'custom') {
      this.difficultyForm.addControl('rows', new FormControl('', Validators.required));
      this.difficultyForm.addControl('columns', new FormControl('', Validators.required));
      this.difficultyForm.addControl('mines', new FormControl('', Validators.required));
    } else {
      this.difficultyForm.removeControl('rows');
      this.difficultyForm.removeControl('columns');
      this.difficultyForm.removeControl('mines');
    }
  }

}
