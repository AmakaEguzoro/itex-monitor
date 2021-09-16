import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { ToastModule } from '../../../typescripts/pro/alerts/toast/toast.module';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastModule.forRoot()
      ],
      declarations: [ AlertComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
