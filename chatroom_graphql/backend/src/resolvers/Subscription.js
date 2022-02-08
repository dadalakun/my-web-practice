import { makeName, checkChatBox } from '../utility'

const Subscription = {
    messageAdded: {
        async subscribe(parent, { name1, name2 }, { db, pubsub }, info) {
            let chatBoxName = makeName(name1, name2);
            let chatBox = await checkChatBox(db, chatBoxName);

            if (!chatBox) {
                throw new Error('ChatBox not found');
            }

            return pubsub.asyncIterator(`message of ${chatBoxName}`);
        },
    },
    chatBoxCleared: {
        async subscribe(parent, { name1, name2 }, { db, pubsub }, info) {
            let chatBoxName = makeName(name1, name2);
            let chatBox = await checkChatBox(db, chatBoxName);

            if (!chatBox) {
                throw new Error('ChatBox not found');
            }

            return pubsub.asyncIterator(`${chatBoxName}`);
        },
    },
};

export default Subscription;