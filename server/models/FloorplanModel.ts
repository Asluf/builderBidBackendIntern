import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FloorplanSchema = new Schema({
  floorplan_name: {
    type: String,
    required: [true, "Floor name field is required!"],
    maxlength: 100,
  },
  type: {
    type: String,
    required: [true, "Floor type field is required!"],
    maxlength: 200,
  },
  scale: {
    type: String,
    required: [true, "Floor scale field is required!"],
    maxlength: 200,
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploads",
    required: [true, "Image field is required!"],
  },
  notes: {
    type: String,
  },
  created_date: {
    type: Date,
    maxlength: 200,
    default: Date.now,
  },
});

const Floorplan = mongoose.model("floorplans", FloorplanSchema);
// module.exports = { Floorplan };
export default Floorplan;