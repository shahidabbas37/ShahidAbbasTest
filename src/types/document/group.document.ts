import { Document } from "mongoose";
export interface GROUP extends Document {
    _id:string;   //groupId
    userId:string;   //systemID
    name:string;  
    usersNames : string [];
    policyNames: string[];
    
}