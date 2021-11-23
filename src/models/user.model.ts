import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { USER } from '../types/document/user.document';



const UserSchema = new Schema(
    {
        email:
        {
            type: String,
            unique: true,
            required: true,
            match: [/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/, 'Please fill a valid email address']
        },  //accessKey
        consoleUser: { type: String, required: true },
        password: { type: String, minlength: 5, required: [true, 'password  should not be empty'] },  //secretKey
        groupNames: { type: Array, default: [] },
        policyNames: { type: Array, default: [] },
    },
    { timestamps: true }
);


// before save user encrypt password
UserSchema.pre('save', async function (next) {

    if (this.isModified('password') || this.isNew) {

        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});

//  delete user password after when save/signup new user
UserSchema.post('save', function (doc) {
    doc.password = undefined;
    //  console.log(doc);
})

// password validation
UserSchema.methods.comparePassword = function (password): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};






export const userSchema = model<USER>("users", UserSchema);
