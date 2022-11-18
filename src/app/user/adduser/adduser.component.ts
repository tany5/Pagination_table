import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IUserData from 'src/app/shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  constructor(private userService: UserService, private modalDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IUserData) {
  }

  first_name = new FormControl('', [Validators.required])
  last_name = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.email, Validators.required])
  avatar = new FormControl('', [Validators.required])

  addUserForm = new FormGroup({
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    avatar: this.avatar
  })

  ngOnInit(): void {
    if (this.data) {
      this.addUserForm.patchValue({
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        email: this.data.email,
        avatar: this.data.avatar,
      })
    }
  }

  addUser() {
    if (this.addUserForm.valid && !this.data) {
      this.userService.addUser(this.addUserForm.value as IUserData).subscribe({
        next: () => {
          this.modalDialog.closeAll()
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
    else {
      console.log("Edit")
      this.userService.editUser(this.addUserForm.value as IUserData, this.data.id).subscribe({
        next: (data) => {
          console.log(data)
          this.modalDialog.closeAll()
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  } 

}
