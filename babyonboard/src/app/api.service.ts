import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { Http, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class APIService {

  private endpoint_h = 'heartbeats/';
  private endpoint_t = 'temperature/';
  private endpoint_b = 'breathing/';
  private endpoint_m = 'movement/';

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

  setMovement(url, value, movement): void{

    var time = +value;
    let data = {
            "status": movement,
            "duration": time
          };
    let message = JSON.stringify(data);
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const options = new RequestOptions({ headers: headers });
    console.log(message);
    this.http.post(url+this.endpoint_m, message, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe();
    console.log('passou do post');


    //this.http.post(url+this.endpoint_m, message , options);

    //return this.http.post(url+this.endpoint_m, JSON.stringify(data), {headers: this.headers}).subscribe();
  }
}
