import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPdfComponent } from './user-pdf.component';

describe('UserPdfComponent', () => {
  let component: UserPdfComponent;
  let fixture: ComponentFixture<UserPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
