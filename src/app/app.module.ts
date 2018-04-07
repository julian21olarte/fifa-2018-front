import { GameService } from './services/game.service';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebase';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesComponent } from './components/games/games.component';
import { ProfileComponent } from './components/profile/profile.component';


// Moment setup
import * as moment from 'moment';
import 'moment/min/locales';
import { AddGameComponent } from './components/add-game/add-game.component';
import { FormsModule } from '@angular/forms';
import { TeamService } from './services/team.service';

moment.locale('es-es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    GamesComponent,
    ProfileComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    HttpClientModule,
    MomentModule,
    NgSelectModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    GameService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
