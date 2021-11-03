import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterswitchComponent } from './interswitch.component';

describe('InterswitchComponent', () => {
  let component: InterswitchComponent;
  let fixture: ComponentFixture<InterswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
