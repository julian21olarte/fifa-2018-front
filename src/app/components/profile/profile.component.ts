import { BetService } from './../../services/bet.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ],
})
export class ProfileComponent implements OnInit {

  private currentUser: any;
  private bets: Array<any>;
  constructor(private authService: AuthService, private betService: BetService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser()
    .switchMap(user => {
      this.currentUser = user;
      return this.betService.getBetsByUserId(user._id);
    })
    .subscribe(bets => {
      this.bets = bets as Array<any>;
      console.log(this.bets);
    });
  }

}
