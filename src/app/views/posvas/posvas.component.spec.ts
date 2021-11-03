import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosvasComponent } from './posvas.component';

describe('PosvasComponent', () => {
  let component: PosvasComponent;
  let fixture: ComponentFixture<PosvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
