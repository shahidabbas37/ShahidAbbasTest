import { Document } from "mongoose";
export interface USER extends Document {
    _id:string;   //systemID
    email:string;  //accessKey
    consoleUser:string;
    password:string;   //secretKey
    groupNames? : string [];
    policyNames?: string[];
    
}