import { AuthService } from './../../services/auth.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, flipInX } from 'ng-animate';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))]),
    trigger('flipInX', [transition('* => *', useAnimation(flipInX))])
  ],
})
export class GamesComponent implements OnInit {

  private games: any;
  private currentUser: any;
  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.gameService.getGames()
    .subscribe(games => {
      this.games = games;
      console.log(this.games);
    });

    this.authService.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
  }

  public getDateFormat(dateTime: number) {
    console.log(dateTime);
    return new Date(dateTime);
  }
}
