import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import IUserData from 'src/app/shared/models/user';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUserData) { }

  ngOnInit(): void {
  }

}
