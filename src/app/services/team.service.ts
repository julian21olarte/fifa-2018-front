import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../config';

@Injectable()
export class TeamService {

  private api: string;
  constructor(private http: HttpClient) {
    this.api = api + 'teams';
  }

  public getTeams() {
    return this.http.get(this.api);
  }

}
