import { AuthService } from './../../services/auth.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
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
