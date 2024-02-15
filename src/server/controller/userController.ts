import {Request, Response} from "express";

export const getUser = async (req: Request, res: Response) => {
    await res.status(200).json({ message: "Idhu Nallaaarukku!" }); 
};