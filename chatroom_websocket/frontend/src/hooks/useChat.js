import { useState } from 'react';
import bcrypt from 'bcryptjs';

const client = new WebSocket('ws://localhost:5001');

const saltRounds = 10;

const useChat = () => {
    const [boxes, setBoxes] = useState([]);
    const [panes, setPanes] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [status, setStatus] = useState({});
    const [isSignIn, setSignIn] = useState(false);

    const add = (boxname, to) => {
        const activeKey = boxname;
        panes.push({ title: to, key: activeKey });
        setActiveTab(activeKey);
        setPanes(panes);
    };
    const remove = (targetKey) => {
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1; // switch to prior pane if taretKey !== 0
            }
        });
        const tempPanes = panes.filter((pane) => pane.key !== targetKey);
        if (tempPanes.length && activeTab === targetKey) {
            if (lastIndex >= 0) {
                setActiveTab(tempPanes[lastIndex].key);
            } else {
                setActiveTab(tempPanes[0].key);
            }
        }
        setActiveTab(activeTab);
        setPanes(tempPanes);
        
        let new_boxes = Object.assign([], boxes);
        new_boxes[targetKey] = null;
        setBoxes(new_boxes);
        // inform the server
        sendData(["close", {targetKey}]);
    };

    const sendMessage = (payload) => {
        sendData(["input", payload]);
    };
    // const makeName = (from, to) => {
    //     return [from, to].sort().join("_")
    // };
    const createChatBox = (user_from, user_to) => {
        // let new_boxes = Object.assign([], boxes);
        // new_boxes[makeName(user_from, user_to)] = [];
        // setBoxes(new_boxes);
        sendData(["chatbox", { from: user_from, to: user_to }]);
    };
    const clearChatBox = (name) => {
        sendData(["clear", { name }]);
    }
    const addUser = async (username, password) => {
        let hash = await bcrypt.hash(password, saltRounds);
        sendData(["create_user", { username, hash }]);
    }
    const login = async (username, password) => {
        sendData(["login", { username, password }]);
    }
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        let new_boxes;
        switch (task) {
            case "init":
                // console.log(payload);
                new_boxes = Object.assign([], boxes);
                new_boxes[payload.box.name] = payload.box.messages.map((e) => ({ name: e.name, body: e.body }));
                setBoxes(new_boxes);
                add(payload.box.name, payload.to);
                break;
            case "output":
                new_boxes = Object.assign([], boxes);
                new_boxes[payload.boxname].push(payload.msg);
                setBoxes(new_boxes);
                break;
            case "status":
                setStatus(payload);
                break;
            case "signin":
                setSignIn(true);
                break;
            case "clear":
                new_boxes = Object.assign([], boxes);
                // console.log(payload);
                new_boxes[payload] = [];
                setBoxes(new_boxes);
                break;
            default: break;
        }
    }
    return {
        isSignIn, status, boxes, panes, remove, activeTab, setActiveTab,
        createChatBox, sendMessage, clearChatBox, addUser, login
    };
};

export default useChat;


