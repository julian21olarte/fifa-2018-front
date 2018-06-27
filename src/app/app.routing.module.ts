import { AddBetComponent } from './components/add-bet/add-bet.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GamesComponent } from './components/games/games.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewGameComponent } from './components/view-game/view-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'bet', component: AddBetComponent},
  { path: 'games',
    children: [
      { path: '', component: GamesComponent },
      { path: 'add', component: AddGameComponent },
      { path: 'view', component: ViewGameComponent },
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
