import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyDataUsers } from 'src/app/test-data/dummy_data_users_response';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let listData = DummyDataUsers.list;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [MatTableModule, MatPaginatorModule, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    component.users = listData;
    fixture.detectChanges();
  });

  it('case #1: should create', () => {
    expect(component).toBeTruthy();
  });

  it('case #2: show user list data', () => {
    const userTableTest: any = document.querySelector('table#user');

    const userInTable = Array.from(
      userTableTest.getElementsByClassName('mat-row')!
    );

    userInTable.forEach((res: any) => {
      const username = res
        .getElementsByClassName('mat-column-username')
        .item(0).textContent;
      const fullname = res
        .getElementsByClassName('mat-column-fullname')
        .item(0).textContent;
      const email = res
        .getElementsByClassName('mat-column-email')
        .item(0).textContent;
      const company = res
        .getElementsByClassName('mat-column-company')
        .item(0).textContent;
        const address = res
        .getElementsByClassName('mat-column-address')
        .item(0).textContent;


      expect(userInTable).toContain(
        jasmine.objectContaining({
          username: username,
          fullname: fullname,
          email: email,
          company: email,
          address: address,
        })
      );
    });
  });

  it('case #3: should show the columns we expect', () => {
    const userTableTest: any = document.querySelector('table#user');

    const tableHeaders = Array.from(
      userTableTest.getElementsByClassName('mat-header-cell')
    );


    const headerClasses = [
      'mat-column-username',
      'mat-column-fullname',
      'mat-column-email',
      'mat-column-address',
      'mat-column-company',
    ];

    tableHeaders.forEach((header: any) => {
      expect(
        headerClasses.some(item => header.classList.contains(item))
      ).toBeTruthy();
    });
  });

  it('case #4: should re-render user-list table every time user data append', () => {
    fixture.detectChanges();
    expect(component.users).toEqual(listData);
  });
});
