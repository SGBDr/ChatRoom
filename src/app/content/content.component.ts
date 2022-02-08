import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../Interface/User';
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  user!: User;
  userSubcription : Subscription = new Subscription();


  constructor(private userService : UserService) { 
    this.userSubcription = this.userService.userSubject.subscribe(
      (u : User) => {
        this.user = u
      }
    )
    this.userService.GetUsers()
  }

  ngOnInit(): void {
    this.userService.emiUser()
  }

}
