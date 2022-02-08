import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    },
    chatbox: {
        type: mongoose.Types.ObjectId,
        ref: "chatbox"
    }
});
// creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema);
// exporting table for queryign and mutating
export default Message;