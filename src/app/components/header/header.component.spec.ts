import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleSideBar', () => {
    expect(component.toggleSidebar).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  
  it('should toggle sidebar', () => {
    let div = fixture.debugElement.nativeElement.querySelector('div');
    div.click();
    fixture.detectChanges();

  fixture.whenStable().then(() => {
    expect(component.toggleSidebar).toHaveBeenCalled();
  });
  });
});
