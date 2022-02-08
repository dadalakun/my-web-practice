import { useEffect, useState } from 'react'
import { Button, Tag, Tabs, message } from 'antd'
import useChat from '../hooks/useChat'
import Message from '../components/Message'
import ChatWithModal from '../components/ChatWithModal'
import Control from '../components/Control'
import Display from '../components/Display'
import TypeBar from './TypeBar'
const { TabPane } = Tabs;

const displayStatus = (payload) => {
    if (payload.msg) {
        const { type, msg } = payload;
        const content = { content: msg, duration: 1 }
        switch (type) {
            case 'success':
                message.success(content);
                break;
            case 'info':
                message.info(content);
                break;
            case 'error':
            default:
                message.error(content);
                break;
        }
    }
}
const makeName = (from, to) => {
    return [from, to].sort().join("_")
};
const ChatRoom = ({ user_from }) => {
    // const [panes, setPanes] = useState([]);
    // const [activeTab, setActiveTab] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { status, boxes, panes, remove, activeTab, setActiveTab, createChatBox, sendMessage, clearChatBox } = useChat();
    // const makeName = (from, to) => {
    //     return [from, to].sort().join("_")
    // };

    useEffect(() => {
        displayStatus(status)
    }, [status])

    /*
     *  Tab
     */
    const onChange = (idx) => {
        setActiveTab(idx);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            setIsModalVisible(true);
        } else {
            remove(targetKey);
        }
    };
    /*
     *  Modal
     */
    const onCreate = (user_to) => {
        setIsModalVisible(false);
        if (boxes[makeName(user_from, user_to)]) {
            displayStatus({
                type: 'error',
                msg: 'Chatbox is opened.'
            })
            return;
        }
        createChatBox(user_from, user_to);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    /*
     *  Else
     */
    const handleClear = () => {
        clearChatBox(activeTab);
    }

    return (
        <>
            <ChatWithModal isVisible={isModalVisible} onCreate={onCreate} onCancel={handleCancel} />
            <Message>
                <Display>
                    <Tabs type="editable-card" onChange={onChange} activeKey={activeTab} onEdit={onEdit} >

                        {panes.map((pane) => (

                            <TabPane tab={pane.title} key={pane.key} style={{ height: '230px', overflow: 'auto' }}>
                                {
                                    boxes[activeTab].length === 0 ? <></> :
                                        (
                                            boxes[activeTab].map(({ name, body }, i) => (
                                                <div className="App-message" key={i} style={{ flexDirection: (name === user_from) ? 'row-reverse' : '' }} >
                                                    <Tag style={{height:"25px"}} color="blue">{name}</Tag>
                                                    <p className="MessageBody" style={{ margin: (name === user_from) ? '0px 10px' : '' }}>{body}</p>
                                                </div>
                                            ))
                                        )

                                }

                            </TabPane>

                        ))}

                    </Tabs>
                </Display>
                <Control>
                    <TypeBar user_from={user_from} activeTab={activeTab}
                        displayStatus={displayStatus} sendMessage={sendMessage}
                        disabled={panes.length === 0} />
                    <Button type="primary" danger ghost onClick={handleClear} disabled={panes.length === 0}>
                        Clear
                    </Button>
                </Control>
            </Message>

        </>
    );
}

export default ChatRoom

