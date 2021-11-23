export interface GroupResponse {
    _id:string;   //groupId
    userId:string;   //systemID
    name:string;  
    usersNames : string [];
    policyNames: string[];
    createdAt?: string;
    updatedAt?: string;
  }
  