import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
        alert('error an la autenticacion');
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
        alert('error an la autenticacion');
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
        alert('error an la autenticacion');
      }
    });
  }

}
