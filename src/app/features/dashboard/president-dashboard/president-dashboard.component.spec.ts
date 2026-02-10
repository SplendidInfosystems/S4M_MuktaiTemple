import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentDashboardComponent } from './president-dashboard.component';

describe('PresidentDashboardComponent', () => {
  let component: PresidentDashboardComponent;
  let fixture: ComponentFixture<PresidentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
