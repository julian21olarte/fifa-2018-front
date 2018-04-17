import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInUp } from 'ng-animate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInUp', [transition('* => *', useAnimation(fadeInUp,
    {
      params : {timing : .4}
    }))])
  ],
})
export class LoginComponent implements OnInit {

  private currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public loginFacebook() {
    this.authService.loginFacebook()
    .then(user => {
      console.log(user);
      if (user) {
        this.router.navigate(['/home']);
      } else {
        alert('error en la autenticacion');
      }
    });
  }
  public loginTwitter() {
    this.authService.loginTwitter()
    .then(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['/home']);
      } else {
        alert('error en la autenticacion');
      }
    });
  }
  public loginGoogle() {
    this.authService.loginGoogle()
    .then(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['/home']);
      } else {
        alert('error en la autenticacion');
      }
    });
  }

}
