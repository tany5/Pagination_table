import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() type:string = 'text'
  @Input() label:string = ''
  @Input() placeholder:string = ''
  @Input() control:FormControl = new FormControl()
  constructor() { }

  ngOnInit(): void {
  }

}
