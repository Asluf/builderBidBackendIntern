import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UploadsSchema = new Schema({
   
    img_path: {
        type: String,
        required: [true, 'Image field is required!'],
        maxlength: 200
    },
    
});

const Uploads = mongoose.model('uploads', UploadsSchema);
// module.exports = { Uploads }
export default Uploads;