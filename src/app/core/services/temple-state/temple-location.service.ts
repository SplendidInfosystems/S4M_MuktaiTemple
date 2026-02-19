import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempleLocationService {

private locationId = new BehaviorSubject<number | null>(null);
  locationId$ = this.locationId.asObservable();

  setLocation(id: number) {
    this.locationId.next(id);
  }

  getCurrentLocation(): number | null {
    return this.locationId.value;
  }}
