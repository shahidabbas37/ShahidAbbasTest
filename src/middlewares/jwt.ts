import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { userSchema } from '../models/user.model';
import { SECRET_KEY } from '../utils/constant';


export default async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.split(' ')[1];

        //console.log(token);
        if (token == null) throw 0;


        jwt.verify(token, SECRET_KEY, (err) => {
            if (err) {
                console.log(err);
                throw 1;
            }
            else {
              
                next();
            }

        })
        // next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized! token is invalid or tempered.'
        });
    }
};

