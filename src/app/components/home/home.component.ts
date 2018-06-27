import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, flipInX } from 'ng-animate';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))]),
    trigger('flipInX', [transition('* => *', useAnimation(flipInX))])
  ],
})
export class HomeComponent implements OnInit {

  private games: Array<any>;
  private gamesBackup: any;
  private currentUser: any;
  private searchText: string;
  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser()
    .switchMap(user => {
      this.currentUser = user;
      return (user && user._id) ? this.gameService.getGamesWithUserCheck(user._id) : this.gameService.getGames();
    })
    .subscribe(games => {
      this.games = games as Array<any>;
      this.gamesBackup = games;
    });

    this.searchText = '';
  }

  public getDateFormat(dateTime: number) {
    return new Date(dateTime);
  }

  public search(event: any) {
    if (event.target.value || event.keyCode === 8) {
      const text = this.searchText.toLowerCase();
      this.games = this.gamesBackup.filter(game => {
        return game.team1.name.toLowerCase().includes(text)
          || game.team2.name.toLowerCase().includes(text);
      });
    }
  }

}
