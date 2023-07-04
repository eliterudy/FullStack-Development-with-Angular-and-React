import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private leaderService: LeaderService) {}
  leaders: Leader[] | undefined;
  ngOnInit(): void {
    this.leaderService.getAllLeaders().subscribe((leaders) => {
      this.leaders = leaders;
    });
  }
}
