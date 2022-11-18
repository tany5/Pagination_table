import { MaterialModule } from './../material/material.module';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[
    UserService
  ],
  exports:[
    InputComponent
  ]
})
export class SharedModule { }
