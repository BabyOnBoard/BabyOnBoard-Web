import { NgForm, FormGroup, FormControl, FormBuilder, } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Baby on Board';

  private alive: boolean;
  private display_h: boolean;
  private display_t: boolean;
  private display_b: boolean;
  private interval: number;

  results_h = {};
  results_t = {};
  results_b = {};

  minutes = new FormControl();

  constructor(private http: HttpClient) {
    this.display_h = false;
    this.display_t = false;
    this.display_b = false;
    this.alive = true;
    this.interval = 1000;
  }

  ngOnInit(): void {

    var url = 'http://localhost:8000/api/v1/';
    var endpoint_h = 'heartbeats/';
    var endpoint_t = 'temperature';
    var endpoint_b = 'breathing';

    this.http.get(url + endpoint_h).subscribe(data => {
      console.log(data);
      this.results_h = data['beats'];
      this.display_h = true;
    })

    this.http.get(url + endpoint_t).subscribe(data => {
      console.log(data);
      this.results_t = data['temperature'];
      this.display_t = true;
    })

    this.http.get(url + endpoint_b).subscribe(data => {
      console.log(data);
      this.results_b = data['is_breathing'];
      this.display_b = true;
    })

    Observable.timer(0, this.interval).subscribe(val => {
        this.http.get(url + endpoint_h).subscribe((data) => {
            this.results_h = data['beats'];
            console.log(data);

          });

          this.http.get(url + endpoint_t).subscribe(data => {
            this.results_t = data['temperature'];
            console.log(data);

          });

          this.http.get(url + endpoint_b).subscribe(data => {
            this.results_b = data['is_breathing'];
            console.log(data);

          });
    });
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  onSubmit(value: string): void {
    console.log(value);
  }
}
