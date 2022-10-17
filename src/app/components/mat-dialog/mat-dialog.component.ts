import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  userForm: FormGroup;
  @Output() onSaveUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  constructor(
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    const userData: UserModel = {
      username: this.userForm.controls['username'].value,
      fullname: this.userForm.controls['fullname'].value,
      email: this.userForm.controls['email'].value,
      company: this.userForm.controls['company'].value,
      address: this.userForm.controls['address'].value,
    }

    this.onSaveUser.emit(userData);

  }


}
