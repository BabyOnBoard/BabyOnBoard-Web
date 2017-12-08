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
  private alert: boolean;
  private display_h: boolean;
  private display_t: boolean;
  private display_b: boolean;
  private interval = 5000;;
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
    this.alert = false;
    this.move = Move.none;

    this.ip = window.location.hostname;
    this.url = 'http://' + this.ip + ':8000/api/v1/';
    this.video = 'http://' + this.ip + ':8081'

  }


  ngOnInit(): void {

    //Constantly requiring the information
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
    this.move = Move.none // screen back to default
  }

  getBeats(){
    this.apiService.getData(this.url+this.endpoint_h).subscribe(data => {
      this.results_h = data['beats'];
      this.display_h = true;
    },
    error => {
      this.results_h = 'Problema de inicialização do berço';
    });
  }

  getTemperature(){
    this.apiService.getData(this.url+this.endpoint_t).subscribe(data => {
      this.results_t = data['temperature'];
      this.display_t = true;
    },
    error => {
      this.results_t = 'Problema de inicialização do berço';
    });
  }

  getBreath(){
    this.apiService.getData(this.url+this.endpoint_b).subscribe(data => {

      switch(data['status']) {
        case "absent":
          this.results_b = "Criança ausente";
          if(this.alert == true) this.alert = false;               //Changing situations makes the alert reset
          break;
        case "breathing":
            this.results_b = "Sem respirar";
            if(this.alert == true) this.alert = false;               //Changing situations makes the alert reset
            break;
        case "no_breathing":
            this.results_b = "Sem respirar";
            if(this.alert == false){        //Only alert once
                this.alert = true;
                console.log("AI NÃO");
                alert("Há algo errado com a respiração do seu bebê!");
            }
            break;
        default:
             console.log("Status de breathing inválido");
     }
     this.display_b = true;
    },
    error => {
      this.results_b = 'Problema de inicialização do berço';
    });
  }

  getMovement(){
    this.apiService.getData("http://192.168.0.165/movement").subscribe(data => {
      this.results_m = data['status'];
    },
    error => {
      console.log('API não encontrada');
    });
  }

  onSubmitFrontMove(value: string): void {
    this.apiService.setMovement("http://192.168.0.165/movement", value, 'front')
    this.move = Move.front_move;
    console.log('front move ativado por ' + value + ' minutos.');
  }

  onSubmitSideMove(value: string): void {
    this.apiService.setMovement("http://192.168.0.165/movement", value, 'side')
    this.move = Move.side_move;
    console.log('side move ativado por ' + value + ' minutos.');
  }

  onSubmitVibrate(value: string): void {
    this.apiService.setMovement("http://192.168.0.165/movement", value, 'vibration')
    this.move = Move.vibrate;
    console.log('vibrar ativado por ' + value + ' minutos.');
  }
}
