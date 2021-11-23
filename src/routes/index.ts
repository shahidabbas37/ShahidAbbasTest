import express from "express";

import { UserRouteApi } from './user.routes';
import ErrorHandler from '../utils/error';

export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
   
    this.router.use("/user", UserRouteApi);
  
   
  }
}
export const MainApi = new MainRouter().router;
