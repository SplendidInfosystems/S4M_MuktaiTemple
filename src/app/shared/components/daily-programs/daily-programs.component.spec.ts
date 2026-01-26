import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProgramsComponent } from './daily-programs.component';

describe('DailyProgramsComponent', () => {
  let component: DailyProgramsComponent;
  let fixture: ComponentFixture<DailyProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyProgramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
