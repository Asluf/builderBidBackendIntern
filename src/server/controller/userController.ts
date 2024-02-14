import {Request, Response} from "express";

export const getUser = function(req: Request, res: Response) {
    res.status(200).json({ message: "Idhu Nallaaarukku!" });
};