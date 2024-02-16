import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  sheetName: { type: String, required: true },
  planType: { type: String, enum: ['Layout/FloorPlan', 'Elevation', 'FoundationPlan', 'SitePlan/PlotPlan'], required: true },
  planScale: { type: String, enum: ['1/32" = 1\'', '1/16" = 1\'', '3/32" = 1\'', '1/8" = 1\'', '3/16" = 1\''], required: true },
  note: { type: String, required: false },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PlanModel = mongoose.model('Plan', planSchema);

export default PlanModel;
