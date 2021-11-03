import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwtamsComponent } from './mwtams.component';

describe('MwtamsComponent', () => {
  let component: MwtamsComponent;
  let fixture: ComponentFixture<MwtamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwtamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwtamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
