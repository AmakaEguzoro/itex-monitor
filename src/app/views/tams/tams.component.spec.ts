import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamsComponent } from './tams.component';

describe('TamsComponent', () => {
  let component: TamsComponent;
  let fixture: ComponentFixture<TamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
