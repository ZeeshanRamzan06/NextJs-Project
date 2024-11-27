import { Message } from "@/models/User";

export interface ApiResponce{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>
}