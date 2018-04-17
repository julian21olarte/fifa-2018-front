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
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
    });
    // this.authService.setCurrentUser();
  }

}
