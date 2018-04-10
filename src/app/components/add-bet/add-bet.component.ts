import { AuthService } from './../../services/auth.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.css']
})
export class AddBetComponent implements OnInit {

  private game: any;
  private currentUser: any;
  private betValue: number;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService) { }

  ngOnInit() {
    this.betValue = 1;
    this.route.queryParams
    .switchMap(params => this.gameService.getGameById(params.gameId))
    .subscribe(game => {
      if (game) {
        this.game = game;
        console.log(this.game);
      }
    });

    this.currentUser = this.authService.getCurrentUser().getValue();
    console.log(this.currentUser);
  }

}
