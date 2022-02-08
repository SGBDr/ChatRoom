import { Discus } from "./discus";
import { Message } from "./Message";

export interface User{
  id : Number,
  name : String,
  image : String,
  email : String,
  discus : Discus[]
}
