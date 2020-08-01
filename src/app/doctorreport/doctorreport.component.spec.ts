import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorreportComponent } from './doctorreport.component';

describe('DoctorreportComponent', () => {
  let component: DoctorreportComponent;
  let fixture: ComponentFixture<DoctorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
