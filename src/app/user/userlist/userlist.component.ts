import { ViewuserComponent } from './../viewuser/viewuser.component';
import { AdduserComponent } from './../adduser/adduser.component';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import IUserData from 'src/app/shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

export class UserlistComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<IUserData> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  totalData: number = 0
  activePage: number = 0
  getUser$: Subscription | undefined
  deleteUser$: Subscription | undefined


  constructor(private userService: UserService, private modalDialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUser$ = this.userService.getUser().subscribe({
      next: (users: any) => {
        this.dataSource = users.data
        this.paginator = users.total
        this.displayedColumns = Object.keys(users.data[0])
        this.displayedColumns.push("action")
        this.totalData = users.per_page
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setPage(event: any) {
    this.activePage = event.pageIndex + 1
    this.getUser$ = this.userService.getUser(this.activePage).subscribe({
      next: (users: any) => {
        this.dataSource = users.data
      }
    })
  }
  addUser() {
    let dialog = this.modalDialog.open(AdduserComponent, {
      width: '400px',
      disableClose: true,
      data: null
    })

    dialog.afterClosed().subscribe({
      next: () => {
        this.getUser$ = this.userService.getUser(this.activePage).subscribe({
          next: (users: any) => {
            this.dataSource = users.data
          }
        })
      }
    })
  }
  editUser(user: IUserData) {
    let dialog = this.modalDialog.open(AdduserComponent, {
      width: '400px',
      disableClose: true,
      data: { ...user }
    })
  }

  deleteUser(id: number) {
    const confirDialog = confirm("Are you sure to delete??")
    if (confirDialog)
      this.deleteUser$ = this.userService.deleteUser(id).subscribe(() => {
        let snackbarRef = this._snackBar.open("User Deleted Successfully", "Close", {
          duration: 10000
        })
        snackbarRef.afterDismissed().subscribe(() => {
          this.getUser$ = this.userService.getUser(this.activePage).subscribe({
            next: (users: any) => {
              this.dataSource = users.data
            }
          })
        })
      })
  }

  viewUser(user: number) {
    this.modalDialog.open(ViewuserComponent, {
      width: '400px',
      disableClose: true,
      data: user
    })
  }

  ngOnDestroy(): void {
    this.getUser$?.unsubscribe()
    this.deleteUser$?.unsubscribe()
  }
}


