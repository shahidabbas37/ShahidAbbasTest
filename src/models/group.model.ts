import { Schema, model } from "mongoose";
import { GROUP } from '../types/document/group.document';



const GroupSchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        usersNames: { type: Array, default: [] },
        policyNames: { type: Array, default: [] },
    },
    { timestamps: true }
);



export const groupSchema = model<GROUP>("groups", GroupSchema);
