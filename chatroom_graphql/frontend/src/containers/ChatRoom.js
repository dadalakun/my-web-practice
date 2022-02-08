import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    CLEAR_CHATBOX_MUTATION
} from "../graphql";
import { Button, Input, Tabs, Badge } from "antd";
import styled from "styled-components";
import Title from "../components/Title";
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import useChatBox from "../hooks/useChatBox";
const { TabPane } = Tabs;
const { Search } = Input;

const Wrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    backgroud: #eeeeee52;
    border_radius: 10px;
    margin: 20px;
    padding: 20px;
    display: flex;
`;

const ControlBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`;

const ChatRoom = ({ user, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox,
        badges, increBadge, resetBadge } = useChatBox();
    const [modalVisible, setModalVisible] = useState(false);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const [clearCB] = useMutation(CLEAR_CHATBOX_MUTATION);

    const onCreate = async (to) => {
        try {
            await startChat({
                variables: {
                    name1: user,
                    name2: to,
                },
            });
            setActiveKey(createChatBox(to));
        } catch (e) {
            displayStatus({
                type: "error",
                msg: e.message,
            });
        }
        setModalVisible(false);
    };

    const onCancel = () => {
        setModalVisible(false);
    };

    const clearChatBox = async (from, to) => {
        try {
            await clearCB({
                variables: {
                    name1: from,
                    name2: to,
                }
            });
        } catch (e) {
            // ChatBox is empty
            displayStatus({
                type: "info",
                msg: e.message,
            });
        }
    };

    // const generateBadge = (targetKey) => {
    //     if (targetKey === activeKey || badges[targetKey] === 0) {
    //         return "";
    //     } else {
    //         return ` (${badges[targetKey]})`;
    //     }
    // }

    return (
        <>
            <ChatModal isVisible={modalVisible} onCreate={onCreate} onCancel={onCancel} />
            <Title>
                <h1>{user}'s Chat Room</h1>
            </Title>
            <Wrapper
                tabBarStyle={{ height: "36px" }}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    resetBadge(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === "add") {
                        setModalVisible(true);
                    }
                    else if (action === "remove") {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
            >
                {/* tab={friend + generateBadge(friend)} */}
                {chatBoxes.map((friend) => (
                    <TabPane 
                        tab={<Badge count={badges[friend]} size="small"><a>{friend}</a></Badge>}
                        closable={true} key={friend} >
                        <ChatBox user={user} friend={friend} active={activeKey === friend} displayStatus={displayStatus}
                            increBadge={() => increBadge(friend)} resetBadge={() => resetBadge(friend)} />
                    </TabPane>
                ))}
            </Wrapper>
            <ControlBlock>
                <Search
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    enterButton="Send"
                    placeholder="Type message here..."
                    onSearch={async (msg) => {
                        if (!msg) {
                            displayStatus({
                                type: "info",
                                msg: "Please enter message.",
                            });
                            return;
                        }
                        await sendMessage({
                            variables: {
                                from: user,
                                to: activeKey,
                                body: msg
                            }
                        });
                        setMessageInput("");
                    }}
                    disabled={!activeKey}
                    style={{ width: "75%" }}
                />
                <Button type="primary" danger ghost onClick={() => clearChatBox(user, activeKey)} disabled={!activeKey}>
                    Clear
                </Button>
            </ControlBlock>

        </>
    );

};

export default ChatRoom;