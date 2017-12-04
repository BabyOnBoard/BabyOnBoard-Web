import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable()
export class APIService {



  private endpoint_h = 'heartbeats/';
  private endpoint_t = 'temperature';
  private endpoint_b = 'breathing';


  constructor(private http:HttpClient) { }

  getBeats(url):Observable<any>{
    return this.http.get(url + this.endpoint_h);
  }

  getTemperature(url):Observable<any>{
    return this.http.get(url + this.endpoint_t);
  }

  getBreath(url):Observable<any>{
    return this.http.get(url + this.endpoint_b);
  }

}
