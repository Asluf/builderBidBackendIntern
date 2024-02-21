import { Request, Response } from 'express';
import Uploads from '../models/UploadsModel';
import {Floorplan, floorValidationSchema} from '../models/FloorplanModel';
import mongoose from 'mongoose';
// import fs from "fs";
// import { deleteUploadedFile } from '../middleware/deletedImageFile';


export const saveFloorPlan = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { floorplan_name, type, scale, notes } = req.body;
   
    const upload = new Uploads({ img_path: file.path });
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
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllFloorPlan = async (req: Request, res: Response) => {
  try {
    const planDetails = await Floorplan.aggregate([
      {
        $lookup: {
          from: 'uploads',
          localField: 'image_id',
          foreignField: '_id',
          as: 'planImage'
        }
      },
      {
        $unwind: {
          path: '$planImage',
          preserveNullAndEmptyArrays: true
        }
      },
      {$match: {active: true}}
    ]);

    if (planDetails.length > 0) {
      res.status(200).json({ floorPlan: planDetails });
    } else {
      res.status(400).json({ message: "No Floor Plan Details Found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get one floor plan according to id
export const getFloorPlan = function (req: Request, res: Response) {
  const planId = req.params.plan_id;

  if (!planId || planId.length !== 24) {
    return res.status(400).json({ success: false, message: "Invalid plan_id" });
  }

  Floorplan.aggregate([
    {
      $lookup: {
        from: "uploads",
        localField: "image_id",
        foreignField: "_id",
        as: "floorPlanImage",
      },
    },
    { $unwind: "$floorPlanImage" },
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(planId),
        active: true,
      },
    },
  ])
    .then((data) => {
      console.log("hi");
      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Floor plan not found!" });
      }
      return res.status(200).json({
        success: true,
        message: `Floor plan found`,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Something went wrong",
        data: err,
      });
    });
};

export const getFloorPlanByType = async (req: Request, res: Response) => {
  try {
   const type = req.params.type;
   const planDetails = await Floorplan.aggregate([
    {
      $lookup: {
        from: 'uploads',
        localField: 'image_id',
        foreignField: '_id',
        as: 'planImage'
      }
    },
    {
      $unwind: {
        path: '$planImage',
        preserveNullAndEmptyArrays: true
      }
    },
    {$match: {type: type, active: true}},
   ])
    if (planDetails.length > 0) {
      return res.status(200).json({
        success: true,
        message: `Floor plan found`,
        data: planDetails,
      });
    } else {
      res.status(400).json({ message: "No Floor Plan Details Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteFloorPlan = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleteFloorPlan = await Floorplan.findByIdAndUpdate({ _id:id},{active:false},{new:true});
    res.status(200).json({ message: 'Floorplan deleted successfully',data:deleteFloorPlan});   
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateFloorPlan = async (req: Request, res: Response) => {
  try {
    const validationResult = floorValidationSchema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map((detail) => detail.message);
      return res.status(400).json({ error: 'Validation Error', details: errorMessages });
    }

    const id = req.params.id;
    const { floorplan_name, type, scale, notes } = req.body;

    const updateFloorPlanDetails = await Floorplan.findByIdAndUpdate(
      { _id: id },
      { floorplan_name, type, scale, notes, updated_date: Date.now()},
      { new: true }
    );

    if (!updateFloorPlanDetails)
      return res.status(404).json({ error: 'No floor plan details found for the given ID' });

    return res.status(200).json({ message: 'FloorPlan Updated', data:updateFloorPlanDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
