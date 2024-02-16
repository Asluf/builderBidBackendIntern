import express, { Request, Response } from 'express';
import Uploads from '../models/UploadsModel';
import Floorplan from '../models/FloorplanModel';


export const getUser = function(req: Request, res: Response) {
  res.status(200).json({ message: "User API is working!" });
};


export const saveFloorPlan = async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { floorplan_name, type, scale, notes } = req.body;
    const upload = new Uploads({ img_path: file.path});
    const savedUpload = await upload.save();

    const floorplan = new Floorplan({
      floorplan_name,
      type,
      scale,
      image_id: savedUpload._id, 
      notes,
    });

    const savedFloorplan = await floorplan.save();

    res.status(201).json({ message: 'Floorplan saved successfully', savedFloorplan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

