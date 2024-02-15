import {Request, Response} from "express";
import ImageModel from '../models/imageModel'; 
import PlanModel from '../models/planModel'; 


export const getUser = async (req: Request, res: Response) => {
    await res.status(200).json({ message: "Idhu Nallaaarukku!" }); 
};



export const savePlan =  async (req: Request, res: Response) => {
  try {
    const { sheetName, planType, planScale, note } = req.body;

    const newImage = await ImageModel.create({
      filename: 'example.jpg', 
      path: '/uploads/example.jpg', 
    });

    const newPlan = await PlanModel.create({
      sheetName,
      planType,
      planScale,
      note,
      imageId: newImage._id, 
    });

    res.status(201).json({newPlan: newPlan});
  } catch (error) {
    console.error('Error saving plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

