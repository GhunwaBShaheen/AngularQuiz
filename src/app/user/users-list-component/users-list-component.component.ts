import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../User';
import { Router } from '@angular/router';
import { SearchExchangeDataService } from 'src/app/header-component/searchExchangeDataService.service';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { UsersApiService } from '../users.service';

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list-component.component.html',
  styleUrls: ['./users-list-component.component.scss'],
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'enterLeft' })],
})
export class UsersListComponentComponent implements OnInit {
  total: number = 0;
  per_page: number = 6;
  page: number = 1;
  pageSizeOptions: number[] = [2, 6, 12];
  pageEvent: PageEvent = new PageEvent();
  usersList: User[] = [];
  showProgressBar = false;
  mainUsersList: User[] = [];
  public busy: Subscription | undefined;

  constructor(
    private router: Router,
    protected spinner: NgxSpinnerService,
    private usersApiService: UsersApiService,
    private searchExchangeDataService: SearchExchangeDataService
  ) {
    // To get info for search
    this.searchExchangeDataService
      .getSearchInfo()
      .subscribe((searchInfo: any) => {
        if (searchInfo.value.length > 0 && !searchInfo.clearSearch) {
          this.usersList = this.mainUsersList.filter(
            (x) => x.id == searchInfo.value
          );
          this.total = this.usersList.length;
          if (this.usersList.length === 0) {
            this.busy = this.usersApiService
              .getUserDetails(searchInfo.value)
              .subscribe((res: any) => {
                this.page = 0;
                this.total = 1;
                this.usersList = [res.data];
                this.mainUsersList = this.usersList;
              });
          }
        } else {
          this.getUsersList(1);
        }
      });
  }

  ngOnInit(): void {
    this.getUsersList(1);
  }

  // To get users list
  getUsersList(page: number) {
    const localUsersStr = localStorage.getItem('users');

    if (localUsersStr && localUsersStr!.length > 0) {
      const localUsers = JSON.parse(localUsersStr!);
      this.page = localUsers.page - 1;
      this.total = localUsers.total;
      this.per_page = localUsers.per_page;
      this.usersList = localUsers.data;
      this.mainUsersList = this.usersList;
    } else {
      this.getUsersFromServer(page);
    }
  }

  // To get users list from server
  getUsersFromServer(page: number) {
    this.showProgressBar = true;
    this.busy = this.usersApiService.getUsers(page).subscribe((res: any) => {
      this.page = res.page - 1;
      this.total = res.total;
      this.per_page = res.per_page;
      this.usersList = res.data;
      this.mainUsersList = this.usersList;

      localStorage.setItem('users', JSON.stringify(res));
      this.showProgressBar = false;
    });
  }

  // To nanicate data
  getNavicationData(page: PageEvent): PageEvent {
    this.getUsersFromServer(+page.pageIndex + 1);
    return page;
  }

  // To show user info
  showUser(user: User) {
    this.router.navigate(['/users/user-info/' + user.id]);
  }

  // To start ngx spinner when busy is started
  onBusyStart(): void {
    this.spinner.show();
  }

  // To stop ngx spinner when busy is stopped
  onBusyStop(): void {
    this.spinner.hide();
  }
}
