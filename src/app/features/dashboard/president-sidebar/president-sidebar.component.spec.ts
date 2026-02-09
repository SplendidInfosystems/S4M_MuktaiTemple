import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentSidebarComponent } from './president-sidebar.component';

describe('PresidentSidebarComponent', () => {
  let component: PresidentSidebarComponent;
  let fixture: ComponentFixture<PresidentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
