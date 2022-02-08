import { Component } from '@angular/core';
import { UserService } from './Service/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ChatRoom';

  constructor(private userService : UserService){
    this.startApp()
  }
  
  startApp(){
    let name : String | null = ""
    let email : String | null = ""
    while(name === "" || name === null)name = prompt("Give your name please : ")
    while(email === "" || email === null)email = prompt("now your email plaese :")
    this.userService.setUser(name, email)
  }
}
