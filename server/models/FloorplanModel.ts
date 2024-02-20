import mongoose from "mongoose";

var Schema = mongoose.Schema;

var FloorplanSchema = new Schema({
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
  deleted: {
    type: Boolean,
    maxlength: 20,
    default: false,
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
});

const Floorplan = mongoose.model("floorplans", FloorplanSchema);
// module.exports = { Floorplan };
export default Floorplan;