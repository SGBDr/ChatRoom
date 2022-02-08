import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Discus } from '../Interface/discus';
import { User } from '../Interface/User';
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() discus! : Discus

  constructor(private userService : UserService) { 
    console.log(this.discus)
  }

  ngOnInit(): void {
  }

}
