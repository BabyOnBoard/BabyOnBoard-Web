import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from "rxjs";
import { APIService } from './api.service';


class MockAPIService {
  public getBeats():Observable<any>{
    return Observable.throw('Erro de teste');
  }

  public getTemperature():Observable<any>{
    return Observable.throw('Erro de teste');
  }

  public getBreath():Observable<any>{
    return Observable.throw('Erro de teste');
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let  mockAPIService: MockAPIService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          {
            provide: APIService,
            useClass: MockAPIService
          }
        ]
      }
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      mockAPIService = fixture.debugElement.injector.get(APIService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBeats should get the result', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getBeats').and.returnValue(Observable.of(
      { "beats": 110 }
    ));
    fixture.detectChanges();
    component.getBeats();
    expect(component.results_h).toEqual(110);
    expect(mockAPIService.getBeats).toHaveBeenCalled();
  }));

  it('getBeats should get the error', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getBeats').and.callThrough();
    fixture.detectChanges();
    component.getBeats();
    expect(component.results_h).toEqual('API não encontrada');
    expect(mockAPIService.getBeats).toHaveBeenCalled();
  }));

  it('getTemperature should get the result', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getTemperature').and.returnValue(Observable.of(
      { "temperature": 37 }
    ));
    fixture.detectChanges();
    component.getTemperature();
    expect(component.results_t).toEqual(37);
    expect(mockAPIService.getTemperature).toHaveBeenCalled();
  }));

  it('getTemperature should get the error', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getTemperature').and.callThrough();
    fixture.detectChanges();
    component.getTemperature();
    expect(component.results_t).toEqual('API não encontrada');
    expect(mockAPIService.getTemperature).toHaveBeenCalled();
  }));

  it('getBreath should get the result', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getBreath').and.returnValue(Observable.of(
      { "is_breathing": true }
    ));
    fixture.detectChanges();
    component.getBreath();
    expect(component.results_b).toEqual(true);
    expect(mockAPIService.getBreath).toHaveBeenCalled();
  }));

  it('getBreath should get the error', fakeAsync(() => {
    const spy = spyOn(mockAPIService, 'getBreath').and.callThrough();
    fixture.detectChanges();
    component.getBeats();
    expect(component.results_b).toEqual('API não encontrada');
    expect(mockAPIService.getBreath).toHaveBeenCalled();
  }));


});
