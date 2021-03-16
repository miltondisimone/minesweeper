import { Component, OnInit } from '@angular/core';
import { IMatchReg } from 'src/app/models/match-reg.model';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  rankList: IMatchReg[];

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.rankList = this.historyService.getRanking();
  }

}
