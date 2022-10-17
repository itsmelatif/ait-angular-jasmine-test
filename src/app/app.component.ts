import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { UserModel } from './model/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ait-angular-jasmine-test';
  users: UserModel[] = [];
  subscription: Subscription[] = [];
  filter!: string;

  constructor(
    private _userService: UserService,
    private dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
      this.subscription.forEach(el => el.unsubscribe());
  }

  onCreateUser(){
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '40%',
    });

    dialogRef.componentInstance.onSaveUser.subscribe((res: UserModel) => {
      this.saveUser(res);
    })

  }

  saveUser(user: UserModel){
    const subsSave = this._userService.saveUser(user).subscribe(res => {
        alert('success add new users');
        this.getUsers()
    }, err => {
      alert(err.message);
    });

    this.subscription.push(subsSave);
  }

  getUsers() {
    const subs = this._userService.getUsers().subscribe((res: UserModel[]) => {
      this.users = res;
     });

     this.subscription.push(subs);
  }
}
