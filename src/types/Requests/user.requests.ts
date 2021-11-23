export interface createReqUser {
    email:string;  //accessKey
    consoleUser:string;
    password:string;   //secretKey
    groupNames? : string[];
    policyNames?:string[];
  }

  export interface loginReq{
      email: string;
      password: string;
  }

 