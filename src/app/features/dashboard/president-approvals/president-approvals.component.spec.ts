import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentApprovalsComponent } from './president-approvals.component';

describe('PresidentApprovalsComponent', () => {
  let component: PresidentApprovalsComponent;
  let fixture: ComponentFixture<PresidentApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentApprovalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
