import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

// Mongoose Schema
const FloorplanSchema = new Schema({
  floorplan_name: {
    type: String,
    required: [true, 'Floor name field is required!'],
    maxlength: 100,
  },
  type: {
    type: String,
    required: [true, 'Floor type field is required!'],
    enum: {
      values: ['Layout/FloorPlan', 'Elevation', 'FoundationPlan', 'SitePlan/PlotPlan'],
      message: 'Invalid floor type. Please choose a valid type',
    },
    maxlength: 200,
  },
  scale: {
    type: String,
    required: [true, 'Floor scale field is required!'],
    enum: {
      values: ['1/32" = 1\'', '1/16" = 1\'', '3/32" = 1\'', '1/8" = 1\'', '3/16" = 1\''],
      message: 'Invalid floor scale. Please select a valid scale.',
    },
    maxlength: 200,
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads',
    required: [true, 'Image field is required!'],
  },
  notes: {
    type: String,
  },
  created_date: {
    type: Date,
    maxlength: 200,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    maxlength: 200,
    default: Date.now,
  },
  active:{
    type: Boolean,
    default: true
  }

});

const Floorplan = mongoose.model('floorplans', FloorplanSchema);

const floorValidationSchema = Joi.object({
  floorplan_name: Joi.string().max(100),
  type: Joi.string().valid('Layout/FloorPlan', 'Elevation', 'FoundationPlan', 'SitePlan/PlotPlan').max(200),
  scale: Joi.string().valid('1/32" = 1\'', '1/16" = 1\'', '3/32" = 1\'', '1/8" = 1\'', '3/16" = 1\'').max(200),
  notes: Joi.string(),
})
  .min(1)
  .or('floorplan_name', 'type', 'scale', 'notes');

export { Floorplan, floorValidationSchema };
