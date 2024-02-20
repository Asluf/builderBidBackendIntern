import { NextFunction, Request, Response } from "express";
import path from "path";

export const validateFormData = function (
  req: any,
  res: any,
  next: NextFunction
) {
  const planType = [
    "Layout/FloorPlan",
    "Elevation",
    "FoundationPlan",
    "SitePlan/PlotPlan",
  ];
  const scaleTypes = [
    "1/32\" = 1'",
    "1/16\" = 1'",
    "3/32\" = 1'",
    "1/8\" = 1'",
    "3/16\" = 1'",
  ];
  const { floorplan_name, type, scale, notes } = req.body;
  // validating the form data
  if (
    floorplan_name &&
    planType.includes(type) &&
    scaleTypes.includes(scale) &&
    notes
  ) {
    console.log("Validation passed");
    next(); 
  } else {
    console.log("Validation failed");
    const validationError = new Error("Invalid data");
    next(validationError); 
  }
};
