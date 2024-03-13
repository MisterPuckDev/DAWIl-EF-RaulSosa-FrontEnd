import { Injectable } from '@angular/core';
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../models/ticket.model";

const baseUrl = AppSettings.API_ENDPOINT + "/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }

  list():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(baseUrl + "/list");
  }

  search(id: number | undefined): Observable<Ticket> {
    return this.http.get<Ticket>(`${baseUrl}/search/${id}`);
  }

  add(obj:Ticket):Observable<any>{
    return this.http.post(baseUrl +"/add", obj);
  }

  update(obj:Ticket):Observable<any>{
    return this.http.put(baseUrl +"/update", obj);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(baseUrl + "/delete/"+ id);
  }

}
