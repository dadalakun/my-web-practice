
const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
};

// return the fooound user (can be null)
const checkUser = (db, name) => {
    if (!name) throw new Error("Missing user name");
    return db.User.findOne({ name });
};

// return the foound chatBox (can be null)
const checkChatBox = (db, chatBoxName) => {
    if (!chatBoxName) throw new Error("Missing chatBox name");
    return db.ChatBox.findOne({ name: chatBoxName });
};

// Make sure (from, to) users and chatBox have been created
// return found { chatBox, sender } (can be null)
const checkMessage = async (db, from, to) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName),
        sender: await checkUser(db, from),
        to: await checkUser(db, to),
    };
};

// make sure calling checkUser beforehand
const newUser = (db, name, password) => {
    return new db.User({ name, password }).save();
};

// make sure calling checkMessage beforehand
const newMessage = (db, sender, body) => {
    return new db.Message({ sender, body }).save();
};

const newChatBox = (db, chatBoxName) => {
    console.log(`Create new chatbox(${chatBoxName})`)
    return new db.ChatBox({ name: chatBoxName }).save();
};

export {
    makeName,
    checkUser,
    checkChatBox,
    checkMessage,
    newUser,
    newMessage,
    newChatBox,
};