import { BetService } from './../../services/bet.service';
import { AuthService } from './../../services/auth.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.css']
})
export class AddBetComponent implements OnInit {

  private game: any;
  private currentUser: any;
  private betValue: number;
  private bet: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private authService: AuthService,
    private betService: BetService) {
    }

  ngOnInit() {
    this.route.queryParams
    .switchMap(params => this.gameService.getGameById(params.gameId))
    .subscribe(game => {
      if (game) {
        this.game = game;
        console.log(this.game);
        this.currentUser = this.authService.getCurrentUser().getValue();
        console.log(this.currentUser);

        // initialize bet
        this.bet = {
          game: this.game._id,
          user: this.currentUser._id,
          value: 1,
          fee: this.game.fees.team1,
          typeBet: null,
          result: {
            team1: 0,
            team2: 0
          },
          date: this.game.date
        };
      }
    });

  }

  public sendBet() {
    const bet = this.formatBet();
    console.log(bet);
    this.betService.saveBet(bet)
    .subscribe(response => {
      if (response) {
        alert(response.message);
        if (response.bet) {
          this.router.navigate(['/games']);
        }
      }
    });
  }

  private formatBet() {
    const bet = {...this.bet};
    bet.fee = bet.typeBet === 'Winner' ?
      (bet.result.team1 > bet.result.team2 ? this.game.fees.team1 : this.game.fees.team2)
      : 6.5;
    return bet;
  }

}
