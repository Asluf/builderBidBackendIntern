import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const ImageModel = mongoose.model('Image', imageSchema);

export default ImageModel;
