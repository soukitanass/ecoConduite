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
});
