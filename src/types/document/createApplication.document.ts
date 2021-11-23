import { Document } from "mongoose";

export interface APPLICATION extends Document {
    _id: string;
    creatorId:string;
    name: string;
    subnet: string;
    roles: string[];
    readPct: number;
    readIOPs: number;
    writeIOPs: number;
    buckets: string[];

}