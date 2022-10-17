import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  {MatTableDataSource } from '@angular/material/table';
import { AppConstant } from 'src/app/constant/app-constant';
import { UserModel } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() users!: UserModel[];
  @Input() filter!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['username', 'fullname', 'email', 'company', 'address'];
  dataSource!: MatTableDataSource<UserModel>;

  length = 0;
  pageSize = AppConstant.PAGE_SIZE;
  pageSizeOptions = AppConstant.PAGE_SIZE_OPTIONS;


  constructor(

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
      const usersChanges = changes['users'];
      const filterUsers = changes['filter'];

      if(usersChanges && !usersChanges.firstChange && usersChanges.previousValue !== usersChanges.currentValue){
        this.getData();
      }

      if(filterUsers && !filterUsers.firstChange && filterUsers.previousValue !== filterUsers.currentValue){
        this.filterData();
      }
  }

  private filterData(){
    this.dataSource.filter = this.filter;
  }

  private getData(){
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.length = this.users.length;
  }

}
