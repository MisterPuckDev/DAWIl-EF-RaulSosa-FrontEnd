import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Status} from "../../models/status.model";

const baseUrl = AppSettings.API_ENDPOINT + "/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) { }

  list():Observable<Status[]>{
    return this.http.get<Status[]>(baseUrl + "/list");
  }

}
