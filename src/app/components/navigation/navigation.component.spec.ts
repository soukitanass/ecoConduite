import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';


import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavigationComponent,
       ],
       imports: [
        HttpClientModule,
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call simulation', () => {
    expect(component.simulation).toBeTruthy();
  });

  it('should call ngInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should execute simulation', () => {
    component.directions.setOrigin('Sherbrooke') ;
    component.directions.setDestination('Montreal') ;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.simulation).toHaveBeenCalled();
    });
  });
  it('should execute getAngle', () => {
    expect(component.getAngle("-71.94202244281769;45.37816240925086","-71.94314360618591;45.37748414753939","-71.94384634494781;45.37803429377304")).toBe(69.22834160502592);
  });
  it('should execute getElevation', () => {
    expect(component.getElevation_("-71.94202244281769","45.37748414753939")).toBe();
  });
});
