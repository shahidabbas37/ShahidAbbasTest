import { Schema, model } from "mongoose";
import { APPLICATION } from './../types/document/createApplication.document';



const ApplicationSchema = new Schema(
    {
        name :{type:String, required:true},
        creatorId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        subnet: { type: String, required: true },
        roles: { type: Array, default: [] },
        readPct: { type: Number, required: true },
        readIOPs: { type: Number, required: true },
        writeIOPs: { type: Number, required: true },

        buckets: { type: Array, default: [] },
    },
    { timestamps: true }
);



export const applicationSchema = model<APPLICATION>("applications", ApplicationSchema);
