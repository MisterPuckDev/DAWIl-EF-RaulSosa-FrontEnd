import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../../models/project.model";

const baseUrl = AppSettings.API_ENDPOINT + "/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  list():Observable<Project[]>{
    return this.http.get<Project[]>(baseUrl + "/list");
  }

}
