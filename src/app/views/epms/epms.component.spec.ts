import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmsComponent } from './epms.component';

describe('EpmsComponent', () => {
  let component: EpmsComponent;
  let fixture: ComponentFixture<EpmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
