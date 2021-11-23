export interface createApplicationReq  {
    name: string;
    creatorId:string;
    subnet: string;
    roles: string[];
    readPct: number;
    readIOPs: number;
    writeIOPs: number;
    buckets: string[];

}