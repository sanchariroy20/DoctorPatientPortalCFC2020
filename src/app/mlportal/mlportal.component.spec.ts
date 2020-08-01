import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlportalComponent } from './mlportal.component';

describe('MlportalComponent', () => {
  let component: MlportalComponent;
  let fixture: ComponentFixture<MlportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
