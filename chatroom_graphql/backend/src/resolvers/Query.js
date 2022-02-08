import { makeName, checkChatBox } from "../utility";

const Query = {
    async userExist(parent, args, { db }, info) {
        const { name } = args;
        if (!name) {
            return false;
        } else {
            const exist = await db.User.findOne({ name });
            return exist ? true : false;
        }
    },
    async chatBox(parent, { name1, name2 }, { db }, info) {
        const box = await checkChatBox(db, makeName(name1, name2));
        return box;
    }
}

export default Query;