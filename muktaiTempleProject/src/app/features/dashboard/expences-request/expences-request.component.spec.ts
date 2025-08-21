import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesRequestComponent } from './expences-request.component';

describe('ExpencesRequestComponent', () => {
  let component: ExpencesRequestComponent;
  let fixture: ComponentFixture<ExpencesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpencesRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
