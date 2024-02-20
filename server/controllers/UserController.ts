import express, { Request, Response } from "express";
import Uploads from "../models/UploadsModel";
import Floorplan from "../models/FloorplanModel";
import mongoose from "mongoose";

export const getUser = function (req: Request, res: Response) {
  res.status(200).json({ message: "User API is working!" });
};

// saveFloorPlan
export const saveFloorPlan = async (req: any, res: any, next: any) => {
  
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

    res
      .status(200)
      .json({ message: "Floorplan saved successfully", savedFloorplan });
  } catch (error) {
    console.error(error);
    next(error);
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
        deleted: false,
      },
    },
  ])
    .then((data) => {
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
