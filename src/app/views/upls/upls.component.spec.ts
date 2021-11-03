import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UplsComponent } from './upls.component';

describe('UplsComponent', () => {
  let component: UplsComponent;
  let fixture: ComponentFixture<UplsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UplsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UplsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
