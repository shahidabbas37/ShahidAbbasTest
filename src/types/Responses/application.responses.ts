import { Document } from "mongoose";



export interface ApplicationResponse extends Document {
    _id: string;
    name: string;
    creatorId:string;
    subnet: string;
    roles: string[];
    readPct: number;
    readIOPs: number;
    writeIOPs: number;
    buckets: string[];
    createdAt?: string;
    updatedAt?: string;

}