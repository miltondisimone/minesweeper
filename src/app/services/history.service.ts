import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }


  getHistory() {  
    return JSON.parse(localStorage.getItem('History'));
  }

  saveHistory(matchReg) {
    let currentMatchs = JSON.parse(localStorage.getItem('History')) || [];
    currentMatchs.push(matchReg);
    localStorage.setItem('History', JSON.stringify(currentMatchs));
  }
}
