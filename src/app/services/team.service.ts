import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  private api: string;
  constructor(private http: HttpClient) {
    this.api = 'http://localhost:3000/teams';
  }

  public getTeams() {
    return this.http.get(this.api);
  }

}
