import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.']
    }
});
// creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema);
// exporting table for queryign and mutating
export default User;