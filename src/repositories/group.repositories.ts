
import { groupSchema } from '../models/group.model';
import { GROUP } from '../types/document/group.document';


export class MainGroup {
  constructor() {}

  createGroup(Group: GROUP)  {
    return new groupSchema(Group).save();
  };

  deleteGroup(id:string){
      return groupSchema.findByIdAndDelete({_id:id});
  };

  getGroupById(id:string){
      return groupSchema.findById({_id:id})
  }

  getAllGroups(){
     
      return  groupSchema.find().populate('userId', 'email');  
  }

}