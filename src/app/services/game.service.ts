import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  private api: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.api = 'http://localhost:3000/games';
  }

  public getGames() {
    return this.http.get(this.api);
  }

  public saveGame(game: any): any {
    return Observable.fromPromise(
      this.authService.getCurrentTokenId()
      .then(tokenId => {
        return this.http.post<any>(this.api + '/save', {game, tokenId}).toPromise();
      })
    );
  }
}
