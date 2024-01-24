import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchExchangeDataService } from './searchExchangeDataService.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {
  constructor(private searchExchangeDataService: SearchExchangeDataService) {}

  ngOnInit(): void {}

  // To search by user id
  search(event: any) {
    this.searchExchangeDataService.setSearchValue({
      value: event.target.value,
      clearSearch: false,
    });
  }
}
