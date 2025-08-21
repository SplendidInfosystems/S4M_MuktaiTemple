import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpencesRequestComponent } from './add-expences-request.component';

describe('AddExpencesRequestComponent', () => {
  let component: AddExpencesRequestComponent;
  let fixture: ComponentFixture<AddExpencesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpencesRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpencesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
