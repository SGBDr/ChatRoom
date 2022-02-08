import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "../Interface/Message";
import { User } from "../Interface/User";

@Injectable()
export class UserService{
    users : User[] = []
    name : String = ""
    email : String = ""

    user : User = {
        id : 0,
        name : "Rodrigue",
        email : "kengoumgassam@gmail.com",
        image : "https://via.placeholder.com/75",
        discus : [
            {
                id : 0,
                nameUser : "Rode",
                image : "https://via.placeholder.com/75",
                lastMessage : {
                    id : 0,
                    content : "Hello Bro",
                    date : "12-13-2201",
                    you : "",
                    delete : false
                },
                sms : [
                    {
                        id : 0,
                        content : "Hello Bro",
                        date : "12-13-2201",
                        you : "",
                        delete : false
                    }
                ]
            }
        ]
    }

    userSubject : Subject<User> = new Subject()
    
    constructor(private httpclient : HttpClient){
    }

    emiUser(){
        this.userSubject.next(this.user);
    }

    setUser(name : String, email : String){
        [this.name, this.email] = [name, email]
        this.GetUsers()
    }

    addSMS(url : String, message : Message){
        this.httpclient
          .get<any[]>('https://chatroom-f9b34-default-rtdb.firebaseio.com/' + url + ".json")
          .subscribe(
            (response) => {
                message.id = response.length
                
                this.httpclient
                .put('https://chatroom-f9b34-default-rtdb.firebaseio.com/' + url + "/" + response.length + ".json", message)
                .subscribe(
                    (response) => {
                        this.GetUsers()
                    }
                );
            }
          );
    }

    addSMS1(url : String, message : Message, id : Number){
        this.httpclient
          .get<any[]>('https://chatroom-f9b34-default-rtdb.firebaseio.com/' + url + ".json")
          .subscribe(
            (response) => {
                let find = false;
                for(let i = 0; i < response.length; i++){
                    var discus = response[i]
                    console.log("ok tapoiste", discus.nameUser, this.user.name)
                    if(discus.nameUser.toLowerCase().trim() === this.user.name.toLowerCase().trim()){
                        message.id = discus.sms != undefined ? discus.sms.length : 0
                        console.log("ok tapoiste fort")
                        find = true
                        this.httpclient
                            .put('https://chatroom-f9b34-default-rtdb.firebaseio.com/users/' + id + "/discus/" + i + "/sms/" + message.id + ".json", message)
                            .subscribe(
                                (r) => {},
                                (e) => {console.log(e)}
                            )
                        break
                    }
                }
                if(!find){
                    /*let di : Discus = {
                        id : 0,
                        nameUser : this.user.name,
                        image : "https://via.placeholder.com/75",
                        lastMessage : message,
                        sms : [message]
                    }*/

                }
            },
            (error) => {
                console.log(error)
            }
        );
    }

    GetUsers() {
        this.httpclient
          .get<any[]>('https://chatroom-f9b34-default-rtdb.firebaseio.com/users.json')
          .subscribe(
            (response) => {
              this.users = response;
              let isThere = false
              for(let u of this.users){
                  if(u.name.toLowerCase() === this.name.toLowerCase() 
                  && u.email.toLowerCase() === this.email.toLowerCase()){
                      this.user = u
                      isThere = true
                  }
              }
              if(isThere)this.emiUser();
              if(!isThere){
                  this.httpclient
                    .get<any[]>('https://chatroom-f9b34-default-rtdb.firebaseio.com/users.json')
                    .subscribe((response) => {
                        let user : User = {
                            id : response.length,
                            name : this.name,
                            email : this.email,
                            image : "https://via.placeholder.com/75",
                            discus : []
                        }
                        this.httpclient
                        .put('https://chatroom-f9b34-default-rtdb.firebaseio.com/users/' + user.id + '.json', user)
                        .subscribe((response) => {})
                    })
              }
            }
          );
      }


}