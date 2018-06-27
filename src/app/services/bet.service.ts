import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { api } from '../config';

@Injectable()
export class BetService {

  private api: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.api = api + 'bets';
  }

  public saveBet(bet: any) {
    return Observable.fromPromise(
      this.authService.getCurrentTokenId()
      .then(tokenId => {
        return this.http.post<any>(this.api + '/save', {bet, tokenId}).toPromise();
      })
    )
    .map(response => {
      if (response.bet) {
        // por corregir
        this.authService.getCurrentUser()
        .subscribe(currentUser => {
          const bill = parseFloat((currentUser.bill - bet.value).toFixed(2));
          this.authService.updateCurrentUserBill(bill);
        });
        return response;
      }
    });
  }

  public getBetsByUserId(id: number) {
    return this.http.get(this.api + '/' + id);
  }
}
