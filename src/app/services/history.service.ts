import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }


  getRanking() {  
    return JSON.parse(localStorage.getItem('ranking'));
  }

  saveRanking(matchReg) {
    let currentMatchs = JSON.parse(localStorage.getItem('ranking')) || [];
    currentMatchs.push(matchReg);
    localStorage.setItem('ranking', JSON.stringify(currentMatchs));
  }
}
