import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UploadsSchema = new Schema({
   
    img_path: {
        type: String,
        required: [true, 'Image field is required!'],
        maxlength: 200
    },
    
});

const Uploads = mongoose.model('uploads', UploadsSchema);
// module.exports = { Uploads }
export default Uploads;