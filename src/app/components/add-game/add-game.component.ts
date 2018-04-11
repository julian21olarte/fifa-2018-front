import { TeamService } from './../../services/team.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  private teams: any;
  private game: any;
  constructor(private teamService: TeamService, private gameService: GameService, private router: Router) {
    this.game = {
      team1: null,
      team2: null,
      team1Goals: null,
      team2Goals: null,
      status: 'Comming Soon',
      date: new Date(),
      time: null
    };
  }

  ngOnInit() {
    this.teamService.getTeams()
    .subscribe(teams => {
      this.teams = teams;
      console.log(this.teams);
    });
  }

  public saveGame() {
    if (this.validateGameFormat()) {
      const game = this.clearGameFormat();
      console.log(game);
      this.gameService.saveGame(game)
      .subscribe(response => {
        console.log(response);
        if (response) {
          alert(response.message);
          if (response.game) {
            this.router.navigate(['/games']);
          }
        }
      });
    } else {
      alert('No se han llenado todos los campos');
    }
  }
  private validateGameFormat() {
    return this.game.team1 && this.game.team1 && this.game.status && this.game.date && this.game.time;
  }
  private clearGameFormat() {
    const game = {...this.game};
    game.date = new Date(game.date.year, game.date.month - 1, game.date.day, game.time.hour, game.time.minute, 0);
    delete game.time;
    console.log(game.date.getTime());
    return game;
  }
  public showConsole() {
    // this.game.date = new Date(this.game.year, this.game.month, this.game.day);
    console.log(this.game);
  }

}
