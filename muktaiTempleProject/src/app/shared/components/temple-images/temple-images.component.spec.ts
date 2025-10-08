import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleImagesComponent } from './temple-images.component';

describe('TempleImagesComponent', () => {
  let component: TempleImagesComponent;
  let fixture: ComponentFixture<TempleImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempleImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
