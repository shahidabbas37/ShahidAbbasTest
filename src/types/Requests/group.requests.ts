export interface createGroupReq {
    name: string;
    userId: string;   //systemID
    usersNames: string[];
    policyNames: string[];
}

export interface loginReq {
    email: string;
    password: string;
}