import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEventComponent } from './monthly-event.component';

describe('MonthlyEventComponent', () => {
  let component: MonthlyEventComponent;
  let fixture: ComponentFixture<MonthlyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
