
import ErrorHandler from '../utils/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";



import { MainUser } from '../repositories/user.repositories';
import bcrypt from 'bcrypt';
//import authenticateToken from "../middlewares/jwt";
import { createReqUser, loginReq } from '../types/Requests/user.requests';
import { UserResponse } from '../types/Responses/user.responses';
import { USER } from '../types/document/user.document';
import { GroupResponse } from '../types/Responses/group.responses';
import { MainGroup } from '../repositories/group.repositories';
import { GROUP } from '../types/document/group.document';
import { createGroupReq } from '../types/Requests/group.requests';
import { createApplicationReq } from '../types/Requests/application.requests';
import { ApplicationResponse } from '../types/Responses/application.responses';
import { APPLICATION } from '../types/document/createApplication.document';
import { MainApplication } from '../repositories/application.rep';


@Route('user')
@Tags('user')

export class UserController {
    constructor() { }

    @Post('/createUser')
    async createUser(@Body() User: createReqUser): Promise<UserResponse> {
        const user: USER | any = await new MainUser().createUser(<USER>User);


        return <UserResponse>user;
    }


    // authorize a user for performing further activities
    // to access others endpoing using JWT

    @Post('/login')
    async login(@Body() req: loginReq): Promise<UserResponse> {
        const user: USER | any = await new MainUser().getUserByEmail(req.email);
        if (!user) throw new ErrorHandler(404, 'no user with this email.');
        // validate the password 
        const validate = await user.comparePassword(req.password);
        if (!validate) throw new ErrorHandler(404, ' either email or password is wrong');

        user.password = undefined;
        return <UserResponse>user;
    }


    // create group 
    // apply jwt on this endpoint so only authenic user can create group
    @Security("bearerAuth")
    @Post('/createGroup')
    async createGroup(@Body() req: createGroupReq): Promise<GroupResponse> {

        // check for user 
        const user = await new MainUser().getUserById(req.userId);
        if (!user) throw new ErrorHandler(404, ' no user exist with this id');

        let group: GROUP = await new MainGroup().createGroup(<GROUP>req);

        return <GroupResponse>group;
    }

    // create application 
    // apply jwt on this endpoint so only authenic user can create application
    @Security("bearerAuth")
    @Post('/createApplication')
    async createApplication(@Body() req: createApplicationReq): Promise<ApplicationResponse> {

        // check for user 
        const user = await new MainUser().getUserById(req.creatorId);
        if (!user) throw new ErrorHandler(404, ' no user exist with this id');

        let application: APPLICATION = await new MainApplication().createApplication(<APPLICATION>req);

        return <ApplicationResponse>application;
    }

     // delete a user 
    // apply jwt on this endpoint so only authenic user can create application
    @Security("bearerAuth")
    @Delete('/deleteUser/:id')
    async deleteUser(id:string): Promise<UserResponse> {

        // check for user 
        const user = await new MainUser().getUserById(id);
        if (!user) throw new ErrorHandler(404, ' no user exist with this id');

        let deletedUser:USER | any = await new MainUser().deleteUser(id);

        return <UserResponse>deletedUser;
    }

      // delete a group 
    // apply jwt on this endpoint so only authenic user can create application
    @Security("bearerAuth")
    @Delete('/deleteGroup/:id')
    async deleteGroup(id:string): Promise<GroupResponse> {

        // check for user 
        const group = await new MainGroup().getGroupById(id);
        if (!group) throw new ErrorHandler(404, ' no group exist with this id');

        let deletedGroup:GROUP | any = await new MainGroup().deleteGroup(id);

        return <GroupResponse>deletedGroup;
    }

    @Get('/getAllGroups')
    async getAllGroups():Promise<GroupResponse>{
        const groups:GROUP | any = await new MainGroup().getAllGroups();
        if(!groups) throw new ErrorHandler(404,'no group exist');
        return <GroupResponse> groups;
    }

    @Get('/getAllApplications')
    async getAllApplications():Promise<ApplicationResponse>{
        const apps:APPLICATION | any = await new MainApplication().getAllApplication();
        if(!apps) throw new ErrorHandler(404,'no applications exist');
        return <ApplicationResponse> apps;
    }

}