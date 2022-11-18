import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUserData from '../models/user';

@Injectable()
export class UserService {
  a: number = 10
  constructor(private http: HttpClient) { }

  getUser(pageNumber: number = 1) {
    return this.http.get(`${environment.ROOT_API}users/?page=${pageNumber}`)
  }

  addUser(user: IUserData) {
    console.log(user)
    return this.http.post(`${environment.ROOT_API}users/`, {
      ...user
    })
  }
  editUser(user: IUserData, id: number | null | undefined) {
    return this.http.put(`${environment.ROOT_API}users/${id}`, {
      ...user
    })
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.ROOT_API}users/${id}`)
  }
}
