import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Baby on Board';

  results_h = {};
  results_t = {};
  results_b = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {


    var url = 'http://localhost:8000/api/v1/';
    var endpoint_h = 'heartbeats/';
    var endpoint_t = 'temperature';
    var endpoint_b = 'breathing';

    this.http.get(url + endpoint_h).subscribe(data => {
      console.log(data);
      this.results_h = data['beats'];
    })

    this.http.get(url + endpoint_t).subscribe(data => {
      console.log(data);
      this.results_t = data['temperature'];
    })

    this.http.get(url + endpoint_b).subscribe(data => {
      console.log(data);
      this.results_b = data['is_breathing'];
    })

  }
}
