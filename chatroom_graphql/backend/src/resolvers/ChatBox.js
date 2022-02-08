const ChatBox = {
    async messages(parent, args, { db }, info) {
        await parent.populate("messages");
        // console.log(parent.messages);
        return parent.messages;
    },
};

export default ChatBox;