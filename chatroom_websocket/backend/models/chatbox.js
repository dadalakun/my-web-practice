import mongoose, { Schema } from 'mongoose';

const ChatBoxSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: "message"
    }]
});
// creating a table within database with the defined schema
const ChatBox = mongoose.model('chatbox', ChatBoxSchema);
// exporting table for queryign and mutating
export default ChatBox;