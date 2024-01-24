import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//To emited search values between components
export class SearchExchangeDataService {
  // To share search info
  searchValue: any;
  searchValueChange: Subject<any> = new Subject<any>();

  constructor() {
    this.searchValueChange.subscribe((value) => {
      this.searchValue = value;
    });
  }

  // To set search value
  setSearchValue(info: any): void {
    this.searchValue = info;
    this.searchValueChange.next(this.searchValue);
  }

  // To return search information
  getSearchInfo(): Observable<any> {
    return this.searchValueChange.asObservable();
  }
}
