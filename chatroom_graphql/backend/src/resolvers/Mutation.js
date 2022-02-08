import { checkUser, newUser, makeName, checkChatBox, newChatBox, checkMessage, newMessage } from '../utility.js';

const Mutation = {
    async signUp (parent, args, { db }, info) {
        const { name, password } = args.data;
        const exist = await db.User.findOne({ name });
        if (exist) {
            throw new Error(`User(${name}) exists.`);
        }
        else {
            const user = new db.User({ name, password });
            await user.save();
            return `Create User(name: ${name}).`;
        } 
    },
    async signIn (parent, args, { db }, info) {
        const { name, password } = args.data;
        const exist = await db.User.findOne({ name });
        if (!exist) {
            throw new Error('User not exist');
        } else {
            if ( password !== exist.password ) {
                throw new Error('Wrong password');
            }
            return "Success"
        }
    },
    async createMessage(parent, { from, to, body }, { db, pubsub }, info) {
        const { chatBox, sender } = await checkMessage(
            db,
            from,
            to,
            body
        );
 
        if (!chatBox) throw new Error("ChatBox not found for createMessage");
        if (!sender)  throw new Error("User not found: " + from);

        const chatBoxName = makeName(from, to);
        const newMsg = await newMessage(db, from, body);
        chatBox.messages.push(newMsg);
        try {
            await chatBox.save();
        } catch (e) {
            console.log("DB saving error");
            console.log(e.message);
        }
        
        pubsub.publish(`message of ${chatBoxName}`, {
            messageAdded: { mutation: "CREATED", data: newMsg },
        });
        
        return newMsg;
    },
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info) {

        if (!name1 || !name2) {
            throw new Error("Missing ChatBox name for createChatBox.");
        }
        if (!(await checkUser(db, name1, "createChatBox"))) {
            throw new Error(`User(${name1}) does not exist`);
        }
        if (!(await checkUser(db, name2, "createChatBox"))) {
            throw new Error(`User(${name2}) does not exist`);
        }
        
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName);
        if (!chatBox) chatBox = await newChatBox(db, chatBoxName);
        // console.log(chatBox);
        return chatBox;
    },
    async clearChatBox(parent, {name1, name2}, {db, pubsub}, info) {
        let chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName);
        if (chatBox.messages.length === 0) {
            throw new Error(`ChatBox is empty`);
        }

        let _ids = chatBox.messages;
        chatBox.messages = [];
        try {
            await db.Message.deleteMany({ _id: {$in: _ids}});
            await chatBox.save();
        } catch (e) {
            console.log("DB saving error");
            console.log(e.message);
        }
        
        pubsub.publish(`${chatBoxName}`, {
            chatBoxCleared: `ChatBox(${chatBoxName}) has been cleared.`,
        });

        return chatBox;
    }
}

// export { Mutation as default };
export default Mutation;