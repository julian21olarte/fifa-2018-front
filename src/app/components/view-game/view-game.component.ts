import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, flipInX } from 'ng-animate';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ],
})
export class ViewGameComponent implements OnInit {

  private game: any;
  private currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService) {
    }

  ngOnInit() {
    this.route.queryParams
    .switchMap(params => this.gameService.getGameById(params.gameId))
    .subscribe(game => {
      if (game) {
        this.game = game;
        console.log(this.game);
      }
    });

  }

}
