import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentLoginComponent } from './president-login.component';

describe('PresidentLoginComponent', () => {
  let component: PresidentLoginComponent;
  let fixture: ComponentFixture<PresidentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
