import { useState } from 'react';

const useChatBox = () => {
    // chatBoxes is an array of strings as friends
    const [chatBoxes, setChatBoxes] = useState([]);
    // badges is an array representing the numbers of not-read-messages
    const [badges, setBadges] = useState([]);

    const createChatBox = (friend) => {
        if (chatBoxes.some((name) => name === friend))
            throw new Error(friend + "'s chat box has been  opened.");
        setChatBoxes([...chatBoxes, friend]);
        // Badge
        resetBadge(friend);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.indexOf(activeKey);
        const newChatBoxes = chatBoxes.filter((name) => name !== targetKey);
        setChatBoxes(newChatBoxes);

        return activeKey
            ? activeKey === targetKey // 1. 要刪除的 tab 是否為激活的 tab
                ? index === 0 // 2. 該 tab 是否剛好也是第一個 tab
                    ? '' // (2) 是 的話則不開啟任何 tab
                    : chatBoxes[index - 1] // (2) 否 的話則開啟前一個 tab
                : activeKey // (1) 否 的話則維持原開啟 tab
                // index 不會有問題，因為 activeKey/targetKey 都是字串
            : '';
    };

    const increBadge = (targetKey) => {
        let new_badges = Object.assign([], badges);
        // console.log(new_badges);
        new_badges[targetKey] = badges[targetKey] + 1;
        // console.log(new_badges);
        setBadges(new_badges);
    }

    const resetBadge = (targetKey) => {
        let new_badges = Object.assign([], badges);
        new_badges[targetKey] = 0;
        setBadges(new_badges);
        // console.log(new_badges);
    }

    return { chatBoxes, createChatBox, removeChatBox,
             badges, increBadge, resetBadge };
};

export default useChatBox;