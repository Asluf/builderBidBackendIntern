import { Request, Response } from 'express';
import Uploads from '../models/UploadsModel';
import {Floorplan, floorValidationSchema} from '../models/FloorplanModel';
// import fs from "fs";
// import { deleteUploadedFile } from '../middleware/deletedImageFile';




export const getUser = function(req: Request, res: Response) {
  res.status(200).json({ message: "User API is working!" });
};


// export const saveFloorPlan = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded." });
//     }

//     const { floorplan_name, type, scale, notes } = req.body;
//     const upload = new Uploads({ img_path: file.path});
//     const savedUpload = await upload.save();

//     const floorplan = new Floorplan({
//       floorplan_name,
//       type,
//       scale,
//       image_id: savedUpload._id, 
//       notes,
//     });

//     const savedFloorplan = await floorplan.save();

//     res.status(201).json({ message: 'Floorplan saved successfully', savedFloorplan });
//   } catch (error:any) {
//     console.error(error);
//     res.status(500).json({ error: error });
//   }
// }
export const saveFloorPlan = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { floorplan_name, type, scale, notes } = req.body;
    // const floorplanData = { floorplan_name, type, scale, notes };
    // const validationResult = floorValidationSchema.validate(floorplanData, { abortEarly: false });

    // if (validationResult.error) {
    //   const validationErrors = validationResult.error.details.map((detail) => detail.message);
    //   await deleteUploadedFile(file.path);
    //   return res.status(400).json({ error: validationErrors });
    // }
    // await uploadFloorPlan(req,res,error);
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

// export const getFloorPlan = async (req: Request, res: Response) => {
//   try {
//     const floorPlan = await Floorplan.find();
//     if(floorPlan.length > 0){
//       const planDetails = await Promise.all(
//         floorPlan.map(async (plan) => {
//           const planImg = await Uploads.findById(plan.image_id);
//           return { plan, planImage: planImg };
//         })
//       );
//       res.status(200).json({ floorPlan: planDetails });
//     }
//     else{
//       res.status(400).json({ message:"No Floor Plan Details Found" });
//     }
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


export const getFloorPlan = async (req: Request, res: Response) => {
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
      res.status(200).json({ FloorPlanByType: planDetails });
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
    res.status(200).json({ message: 'Floorplan deleted successfully',deleteFloorPlan:deleteFloorPlan});   
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

    return res.status(200).json({ message: 'FloorPlan Updated', updateFloorPlanDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
