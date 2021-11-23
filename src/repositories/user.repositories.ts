

import { userSchema } from '../models/user.model';
import { USER } from '../types/document/user.document';




export class MainUser {
  constructor() {}
  getUserById(_id: string){
    return  userSchema.findById(_id);;
  };
  getUserByEmail(email: string){
    return  userSchema.findOne({email:email});;
  };
  createUser(User: USER)  {
    return new userSchema(User).save();
  };

  deleteUser(id:string){
      return userSchema.findByIdAndDelete({_id:id});
  }

}