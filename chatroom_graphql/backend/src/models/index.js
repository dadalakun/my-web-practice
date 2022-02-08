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

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: [true, 'Sender field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
});

const ChatBoxSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: "message"
    }]
});

const User = mongoose.model('user', UserSchema);
const Message = mongoose.model('message', MessageSchema);
const ChatBox = mongoose.model('chatbox', ChatBoxSchema);

export default { User, Message, ChatBox };
