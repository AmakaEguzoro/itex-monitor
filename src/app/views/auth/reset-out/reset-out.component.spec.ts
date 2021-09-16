import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResetOutComponent } from './reset-out.component';

describe('ResetOutComponent', () => {
  let component: ResetOutComponent;
  let fixture: ComponentFixture<ResetOutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
