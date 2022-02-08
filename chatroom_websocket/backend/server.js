import WebSocket from 'ws';
import mongoose from 'mongoose'
import express from 'express'
import http from 'http'
import dotenv from 'dotenv-defaults'

import Message from './models/message'
import User from './models/user'
import ChatBox from './models/chatbox';

import bcrypt from 'bcryptjs';
import { sendData, sendStatus } from './wssConnect'

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL, dboptions).then
    (() => { console.log('mongo db connection created') });

db.once('open', () => {
    const chatboxes = [];
    const broadcastMessage = (boxname, data) => {
        wss.clients.forEach((client) => {
            if (client.chatboxes_local.includes(boxname)) {
                sendData(data, client);
            }
        });
    };
    const makeName = (from, to) => {
        return [from, to].sort().join("_")
    };
    const userExist = async (name) => {
        let existing = await User.findOne({ name });
        return existing;
    }
    const validateUser = async (user, password) => {
        let res = await bcrypt.compare(password, user.password);
        return res;
    };

    const validateChatBox = async (boxname, participants) => {
        let box = await ChatBox.findOne({ name: boxname });
        if (!box) {
            console.log(`Create a new chatbox (${boxname})`);
            box = await new ChatBox({ name: boxname, users: participants }).save();
        } else {
            console.log(`Load chatbox (${boxname})`);
        }
        await box.populate("messages");
        return box;
    };

    wss.on('connection', (ws) => {
        ws.chatboxes_local = [];
        ws.onmessage = async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case 'chatbox':
                    const { from, to } = payload;
                    const user_from = await userExist(from);
                    const user_to = await userExist(to);
                    if (user_to) {
                        let box = await validateChatBox(makeName(from, to), [user_from._id, user_to._id]);
                        chatboxes[box.name] = box;
                        ws.chatboxes_local.push(box.name);
                        
                        sendData(['init', {box, to}], ws);
                        sendStatus({ type: 'success', msg: 'Load chatbox' }, ws);
                    } else {
                        sendStatus({ type: 'error', msg: `User "${to}" does not exist.` }, ws);
                    }
                    break;
                case 'input':
                    const { boxname, msg } = payload;
                    const message = new Message({ ...msg, chatbox: chatboxes[boxname]._id });
                    chatboxes[boxname].messages = [...chatboxes[boxname].messages, message];

                    try {
                        await message.save();
                        await chatboxes[boxname].save();
                    } catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    // sendData(['output', payload], ws);
                    sendStatus({ type: 'success', msg: 'Message sent.' }, ws);
                    broadcastMessage(boxname, ['output', payload]);
                    break;
                case 'clear':
                    const { name } = payload;
                    chatboxes[name].messages = [];
                    try {
                        await chatboxes[name].save();
                        await Message.deleteMany({ chatbox: chatboxes[name]._id });
                    } catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    // sendData(['init', chatboxes[name]], ws);
                    sendStatus({ type: 'success', msg: 'Clear the chatbox.' }, ws);
                    broadcastMessage(name, ['clear', name]);
                    break;
                case 'create_user':
                    if (await User.findOne({ name: payload.username })) {
                        sendStatus({ type: 'error', msg: 'User exists.' }, ws);
                    }
                    else {
                        const user = new User({ name: payload.username, password: payload.hash });
                        await user.save();
                        sendStatus({ type: 'success', msg: `User ${payload.username} created.` }, ws);
                    }
                    break;
                case 'login':
                    let user = await userExist(payload.username);
                    if (user) {
                        let res = await validateUser(user, payload.password);
                        if (res) {
                            sendData(['signin'], ws);
                            sendStatus({ type: 'success', msg: `User ${payload.username} login.` }, ws);
                        } else {
                            sendStatus({ type: 'error', msg: 'Wrong password.' }, ws);
                        }
                    } else {
                        sendStatus({ type: 'error', msg: 'User does not exist.' }, ws);
                    }
                    break;
                case 'close':
                    const idx = ws.chatboxes_local.indexOf(payload.targetKey);
                    ws.chatboxes_local.splice(idx, 1);
                    break;
                default:
                    break;
            }
        }
    })

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`Server is up on port ${port}.`)
    })

})

