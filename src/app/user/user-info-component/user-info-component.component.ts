import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../User';

import { Location } from '@angular/common';
import { SearchExchangeDataService } from 'src/app/header-component/searchExchangeDataService.service';
import { bounceInRightOnEnterAnimation } from 'angular-animations';
import { UsersApiService } from '../users.service';

@Component({
  selector: 'app-user-info-component',
  templateUrl: './user-info-component.component.html',
  styleUrls: ['./user-info-component.component.scss'],
  animations: [
    bounceInRightOnEnterAnimation({
      anchor: 'enterRight',
      // delay: 200,
      duration: 1000,
    }),
  ],
})
export class UserInfoComponentComponent implements OnInit {
  userId: number = 0;
  user: User | undefined;

  constructor(
    private location: Location,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private usersApiService: UsersApiService,
    private searchExchangeDataService: SearchExchangeDataService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.getUserData();
    });
  }

  ngOnInit(): void {}

  // To get user data
  getUserData() {
    const localUsersStr = localStorage.getItem('users');

    // In case user data exists in local strage
    if (localUsersStr && localUsersStr!.length > 0) {
      const localUsers = JSON.parse(localUsersStr!);

      this.user = localUsers.data.find((x: User) => x.id === +this.userId);

      if (!this.user) {
        this.usersApiService
          .getUserDetails(this.userId)
          .subscribe((res: any) => {
            this.user = res.data;
          });
      }
    } else {
      this.usersApiService.getUserDetails(this.userId).subscribe((res: any) => {
        this.user = res.data;
      });
    }
  }

  // To back to users list
  backToUsers() {
    this.searchExchangeDataService.setSearchValue({
      value: '',
      clearSearch: true,
    });
    this.location.back();
  }
}
