import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../Interface/Message';
import { User } from '../Interface/User';
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userSubcription : Subscription = new Subscription();
  user! : User
  id = 0
  sms = ""

  constructor(private userService : UserService, private route : ActivatedRoute) {
    this.userSubcription = this.userService.userSubject.subscribe(
      (u : User) => {
        this.user = u
      }
    )
    setInterval(() => {
      this.userService.GetUsers()
    }, 500)
   }

  onSubmit(form: NgForm) {
    let message : Message = {
      id : 0,
      content : form.value.sms,
      date : this.getDate(),
      you : this.user.discus[this.id].nameUser,
      delete : false
    }

    let message1 : Message = {
      id : 0,
      content : form.value.sms,
      date : this.getDate(),
      you : this.user.name,
      delete : false
    }

    var url = "users/" + this.user.id + "/discus/" + this.id + "/sms"
    this.userService.addSMS(url, message)

    url = "users/" + this.user.discus[this.id].id + "/discus"

    message1.you = this.user.discus[this.id].nameUser
    this.userService.addSMS1(url, message1, this.user.discus[this.id].id)
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id'])
    this.userService.GetUsers()
  }

  getDate() : String {
    let date = new Date()
    return '' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
  }

}
