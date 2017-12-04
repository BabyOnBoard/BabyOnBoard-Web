import { Component, OnDestroy, OnInit, Input, } from '@angular/core';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable"
import { HttpClient } from '@angular/common/http';
import { Move } from './move.enum';
import { MoveDecorator } from './move.decorator';
import { APIService } from './api.service';


declare var myIP: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@MoveDecorator
export class AppComponent implements OnInit {
  title = 'Baby on Board';


  private alive: boolean;
  private display_h: boolean;
  private display_t: boolean;
  private display_b: boolean;
  private interval: number;
  private ip: string;
  private url;

  move: Move;
  video: string;

  results_h = {};
  results_t = {};
  results_b = {};


  constructor(private apiService:APIService) {
    this.display_h = false;
    this.display_t = false;
    this.display_b = false;
    this.alive = true;
    this.interval = 1000;
    this.move = Move.none;

    this.ip = window.location.hostname;
    this.url = this.ip + ':8000/api/v1/';
    this.video = this.ip + ':8081'

  }


  ngOnInit(): void {

    this.getBeats();
    this.getTemperature();
    this.getBreath();

    Observable.timer(0, this.interval).subscribe(val => {
        this.getBeats();
        this.getTemperature();
        this.getBreath();
    });

  /*  Observable.timer(0, this.interval).subscribe(val => {
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
    }); */
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  getBeats(){
    this.apiService.getBeats(this.url).subscribe(data => {
      this.results_h = data['beats'];
      this.display_h = true;
    },
    error => {
      this.results_h = 'API não encontrada';
    });
  }

  getTemperature(){
    this.apiService.getTemperature(this.url).subscribe(data => {
      this.results_t = data['temperature'];
      this.display_t = true;
    },
    error => {
      this.results_t = 'API não encontrada';
    });
  }

  getBreath(){
    this.apiService.getBreath(this.url).subscribe(data => {
      this.results_b = data['is_breathing'];
      this.display_b = true;
    },
    error => {
      this.results_b = 'API não encontrada';
    });
  }

  onSubmitCancel():void {
    this.move = Move.none
  }

  onSubmitFrontMove(): void {

    this.move = Move.front_move;
    console.log('front move ativado');
    //post
  }

  onSubmitSideMove(value: string): void {

    this.move = Move.side_move;
    console.log('side move ativado');
  }

  onSubmitVibrate(value: string): void {

    this.move = Move.vibrate;
    console.log('vobrar ativado');
  }
}
