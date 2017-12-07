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
  private endpoint_h = 'heartbeats/';
  private endpoint_t = 'temperature/';
  private endpoint_b = 'breathing/';
  private endpoint_m = 'movement/';
  private ip: string;
  private url;

  private results_m = {};
  results_h = {};
  results_t = {};
  results_b = {};

  move: Move;
  video: string;


  constructor(private apiService:APIService) {
    this.display_h = false;
    this.display_t = false;
    this.display_b = false;
    this.alive = true;
    this.interval = 5000;
    this.move = Move.none;

    this.ip = window.location.hostname;
    this.url = 'http://' + this.ip + ':8000/api/v1/';
    this.video = 'http://' + this.ip + ':8081'

  }


  ngOnInit(): void {

    Observable.timer(0, this.interval).subscribe(val => {
        this.getBeats();
        this.getTemperature();
        this.getBreath();
        this.getMovement();

        if(this.results_m == "resting" && this.move != Move.none){
            this.onSubmitCancel();
        }
    });
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  onSubmitCancel():void {
    this.move = Move.none
  }

  getBeats(){
    this.apiService.getData(this.url+this.endpoint_h).subscribe(data => {
      this.results_h = data['beats'];
      this.display_h = true;
    },
    error => {
      this.results_h = 'API não encontrada';
    });
  }

  getTemperature(){
    this.apiService.getData(this.url+this.endpoint_t).subscribe(data => {
      this.results_t = data['temperature'];
      this.display_t = true;
    },
    error => {
      this.results_t = 'API não encontrada';
    });
  }

  getBreath(){
    this.apiService.getData(this.url+this.endpoint_b).subscribe(data => {
      this.results_b = data['status'];
      this.display_b = true;
    },
    error => {
      this.results_b = 'API não encontrada';
    });
  }

  getMovement(){
    this.apiService.getData(this.url+this.endpoint_m).subscribe(data => {
      this.results_m = data['status'];
    },
    error => {
      console.log('API não encontrada');
    });
  }

  onSubmitFrontMove(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'front')
    this.move = Move.front_move;
    console.log('front move ativado por ' + value + ' minutos.');
  }

  onSubmitSideMove(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'side')
    this.move = Move.side_move;
    console.log('side move ativado por ' + value + ' minutos.');
  }

  onSubmitVibrate(value: string): void {
    this.apiService.setMovement(this.url+this.endpoint_m, value, 'vibration')
    this.move = Move.vibrate;
    console.log('vibrar ativado por ' + value + ' minutos.');
  }
}
