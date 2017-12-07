import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { Http, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class APIService {


  private endpoint_m = 'movement/';

  constructor(private http:HttpClient) { }


  getData(url):Observable<any>{
    return this.http.get(url);
  }

  setMovement(url, value, movement): void{

    var time = +value;
    let data = {
            "status": movement,
            "duration": time
          };
    let message = JSON.stringify(data);

    console.log(message);
    this.http.post(url+this.endpoint_m, message, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe();
    console.log('passou do post');


    //this.http.post(url+this.endpoint_m, message , options);

    //return this.http.post(url+this.endpoint_m, JSON.stringify(data), {headers: this.headers}).subscribe();
  }
}
