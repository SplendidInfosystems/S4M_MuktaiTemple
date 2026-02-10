import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentReportComponent } from './president-report.component';

describe('PresidentReportComponent', () => {
  let component: PresidentReportComponent;
  let fixture: ComponentFixture<PresidentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
