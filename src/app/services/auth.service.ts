import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private currentUser: any;
  private currentUserObservable: Subject<any>;
  private api: string;
  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {
    this.api = 'http://localhost:3000/auth/login';

    this.currentUserObservable = new Subject();
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
      return this.loginProviderExisting(error);
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
      return this.loginProviderExisting(error);
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
      return this.loginProviderExisting(error);
    });
  }

  private loginUser() {
    return this.fireAuth.auth.currentUser.getIdToken(true)
      .then(idToken => this.http.post(this.api, {id: idToken}).toPromise()
      .then(user => {
        this.currentUser = user;
        this.currentUser.name = this.fireAuth.auth.currentUser.displayName;
        this.currentUser.email = this.fireAuth.auth.currentUser.email;
        this.currentUser.image = this.fireAuth.auth.currentUser.photoURL;
        return this.currentUser;
      }));
  }


  private loginProviderExisting(errorResponse: any) {
    const email = errorResponse.email;
    const credential = errorResponse.credential;
    if (errorResponse.code !== 'auth/account-exists-with-different-credential') {
      return null;
    }
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
          provider.setCustomParameters({login_hint: email});
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

  public getCurrentUser(): Observable<any> {
    return this.currentUserObservable;
  }
  private setCurrentUser(user: any) {
    this.currentUserObservable.next(user);
  }
}
