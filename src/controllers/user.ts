import { NextFunction, Request, Response } from "express";


// get current logged in user
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: req.user });
    }catch(err){
        next(err);
    }
}