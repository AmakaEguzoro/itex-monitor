import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapkComponent } from './capk.component';

describe('CapkComponent', () => {
  let component: CapkComponent;
  let fixture: ComponentFixture<CapkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
