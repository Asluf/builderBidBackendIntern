import {Request, Response} from "express";
import ImageModel from '../models/imageModel'; 
import PlanModel from '../models/planModel'; 
import path from 'path';


export const getUser = async (req: Request, res: Response) => {
    await res.status(200).json({ message: "Idhu Nallaaarukku!" }); 
};



export const savePlan =  async (req: Request, res: Response) => {
  try {
    const { sheetName, planType, planScale, note } = req.body;

    if(!req.file){
      return res.status(400).json({ message: 'Image file not available'});
    }

    const planImage = await ImageModel.create({
      filename: req.file.filename, 
      path: req.file.path + path.extname(req.file.originalname), 
    });

    const newPlan = await PlanModel.create({
      sheetName,
      planType,
      planScale,
      note,
      imageId: planImage._id, 
    });

    res.status(201).json({newPlan: newPlan});
  } catch (error) {
    console.error('Error saving plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

