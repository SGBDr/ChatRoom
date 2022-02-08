import { Message } from "./Message";


export interface Discus{
    id : Number,
    lastMessage : Message,
    image : String,
    nameUser : String,
    sms : Message[]
}