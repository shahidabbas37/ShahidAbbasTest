export interface UserResponse {
    _id: string;   //systemID
    email:string;  //accessKey
    consoleUser:string;
    groupNames :string [];
    policyNames:string [];
    createdAt?: string;
    updatedAt?: string;
  }
  