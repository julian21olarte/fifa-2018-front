import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthCredential } from '@firebase/auth-types';

@Injectable()
export class AuthService {

  private currentUser: any;
  private currentUserObservable: BehaviorSubject<any>;
  private api: string;
  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {
    this.api = 'http://localhost:3000/auth/login';
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.currentUserObservable = new BehaviorSubject(this.currentUser);
  }

  public loginFacebook() {
    return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(response => this.loginUser())
      .then(user => {
        this.setCurrentUser(user);
        return user;
      })
      .catch(error => {
        console.log(error);
        return this.loginErrorHandler(error);
      });
  }


  public loginTwitter() {
    return this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(response => this.loginUser())
      .then(user => {
        this.setCurrentUser(user);
        return user;
      })
      .catch(error => {
        return this.loginErrorHandler(error);
      });
  }


  public loginGoogle() {
    return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => this.loginUser())
      .then(user => {
        this.setCurrentUser(user);
        return user;
      })
      .catch(error => {
        return this.loginErrorHandler(error);
      });
  }

  private loginUser() {
    return this.fireAuth.auth.currentUser.getIdToken(true)
      .then(idToken => {
        if (localStorage.getItem('currentUser') !== null) {
          return this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        return this.http.post(this.api, { id: idToken }).toPromise()
          .then(user => {
            console.log(this.fireAuth.auth.currentUser);
            this.currentUser = user;
            this.currentUser.name = this.fireAuth.auth.currentUser.displayName;
            this.currentUser.email = this.fireAuth.auth.currentUser.email;
            this.currentUser.image = this.fireAuth.auth.currentUser.photoURL;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return this.currentUser;
          });
      });
  }


  private loginErrorHandler(errorResponse: any) {
    const email = errorResponse.email;
    const credential = errorResponse.credential;
    if (errorResponse.code !== 'auth/account-exists-with-different-credential') {
      return null;
    }
    return this.loginIfExistProvider(email, credential);
  }
  private loginIfExistProvider(email: string, credential: AuthCredential) {
    return this.fireAuth.auth.fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length) {
          let provider = null;
          switch (providers[0]) {
            case 'twitter.com': provider = new firebase.auth.TwitterAuthProvider(); break;
            case 'facebook.com': provider = new firebase.auth.FacebookAuthProvider(); break;
            case 'github.com': provider = new firebase.auth.GithubAuthProvider(); break;
            case 'google.com': provider = new firebase.auth.GoogleAuthProvider(); break;
          }
          if (provider) {
            provider.setCustomParameters({ login_hint: email });
            return this.fireAuth.auth.signInWithPopup(provider)
              .then(resp =>
                this.fireAuth.auth.currentUser.linkWithCredential(credential)
                  .then(response => this.loginUser())
                  .then(user => {
                    this.setCurrentUser(user);
                    return user;
                  }));
          }
        } else {
          alert('Error obteniendo los proveedores de autenticacion.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error obteniendo los proveedores de autenticacion.');
      });
  }

  public logout() {
    if (localStorage.getItem('currentUser') !== null) {
      localStorage.removeItem('currentUser');
      this.setCurrentUser();
    }
  }

  public getCurrentTokenId() {
    return this.fireAuth.auth.currentUser.getIdToken(false);
  }

  public getCurrentUser() {
    return this.currentUserObservable;
  }

  public updateCurrentUserBill(bill: number) {
    this.currentUser.bill = bill;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.setCurrentUser(this.currentUser);
  }

  private setCurrentUser(user: any = null) {
    this.currentUserObservable.next(user);
  }
}
