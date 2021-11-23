import express from 'express'



import { UserController } from '../controllers/user.controller';

import { createReqUser, loginReq } from '../types/Requests/user.requests';
import { UserResponse } from '../types/Responses/user.responses';
import jwt from 'jsonwebtoken';
import { createGroupReq } from '../types/Requests/group.requests';
import { GroupResponse } from '../types/Responses/group.responses';
import authenticateToken from '../middlewares/jwt';
import { SECRET_KEY } from '../utils/constant';
import { createApplicationReq } from '../types/Requests/application.requests';
import { ApplicationResponse } from '../types/Responses/application.responses';
import { USER } from './../types/document/user.document';
import { GROUP } from './../types/document/group.document';
import { APPLICATION } from '../types/document/createApplication.document';





export class UserRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        // create a user
        this.router.post('/createUser', async (req, res, next) => {
            try {
                const getreq: createReqUser = req.body;
                const user: UserResponse = await new UserController().createUser(getreq);
                res.status(201).json({
                    msg: ' user has been created',
                    user: user
                })
            } catch (error) {
                next(error);
            }
        });

        // login to generate token 

        this.router.post('/login', async (req, res, next) => {
            try {
                const getreq: loginReq = req.body;
                const user: UserResponse = await new UserController().login(getreq);
                // const user1 = user.toJSON
                const token = jwt.sign(JSON.parse(JSON.stringify(user)), SECRET_KEY, {
                    expiresIn: 60 * 60
                });

                res.status(201).json({
                    msg: ' user has been logedIn',
                    user: user,
                    token: token
                })

            } catch (error) {
                next(error);
            }
        });



        // creating a new group 
        // using jwt middleware here so we must send token
        // first login get token then send for this endpoint

        this.router.post('/createGroup',authenticateToken, async (req, res, next) => {
            try {
                const getreq: createGroupReq = req.body;
                const group: GroupResponse = await new UserController().createGroup(getreq);

                res.status(201).json({
                    msg: ' group has been created',
                    group: group
                })

            } catch (error) {
                next(error);
            }
        });

        // creating a new application 
        // using jwt middleware in this route too
       

        this.router.post('/createApplication',authenticateToken, async (req, res, next) => {
            try {
                const getreq: createApplicationReq = req.body;
                const application: ApplicationResponse = await new UserController().createApplication(getreq);

                res.status(201).json({
                    msg: ' application has been created',
                    applicatin: application
                })

            } catch (error) {
                next(error);
            }
        });

        // delete a user
        this.router.delete('/deleteUser/:id',authenticateToken,async(req,res,next)=>{
            try {
                const id = req.params.id;
                const user: USER |any= await new UserController().deleteUser(id);

                user.password = undefined;
                res.status(201).json({
                    msg: ' user has been deleted',
                    user: user
                })
            } catch (error) {
                next(error);
            }
        });

         // delete a group
         this.router.delete('/deleteGroup/:id',authenticateToken,async(req,res,next)=>{
            try {
                const id = req.params.id;
                const group: GROUP |any= await new UserController().deleteGroup(id);

                res.status(200).json({
                    msg: ' group has been deleted',
                    group: group
                })
            } catch (error) {
                next(error);
            }
        });

        // get all groups
        this.router.get('/getAllGroups',async(req,res,next)=>{
            try {
               
                const groups: GROUP |any= await new UserController().getAllGroups();

                res.status(200).json({
                    msg: ' All groups',
                    groups: groups
                })
            } catch (error) {
                next(error);
            }
        });

        // get all applications
        this.router.get('/getAllApplications',async(req,res,next)=>{
            try {
               
                const apps: APPLICATION |any= await new UserController().getAllApplications();

                res.status(200).json({
                    msg: ' All application',
                    applications: apps
                })
            } catch (error) {
                next(error);
            }
        });
    }


}


export const UserRouteApi = new UserRoutes().router;