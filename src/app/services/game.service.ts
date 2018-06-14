import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../config';

@Injectable()
export class GameService {

  private api: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.api = api + 'games';
  }

  public getGames() {
    return this.http.get(this.api);
  }

  /**
   * getGamesWithUserCheck
   * @param userId
   */
  public getGamesWithUserCheck(userId = null) {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }
    return this.http.get(this.api, {params});
  }

  public getGameById(id: number) {
    return this.http.get(this.api + '/' + id);
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
