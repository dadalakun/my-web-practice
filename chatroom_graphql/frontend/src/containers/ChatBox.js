import Message from "../components/Message"
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import {
    CHATBOX_QUERY,
    MESSAGE_ADDED_SUBSCRIPTION,
    CHATBOX_CLEARED_SUBSCRIPTION
} from "../graphql";

const Messages = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const ChatBox = ({ user, friend, displayStatus, active, increBadge, resetBadge }) => {
    const messagesFooter = useRef(null);

    const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name1: user,
            name2: friend,
        },
    });

    const scrollToBottom = () => {
        messagesFooter.current?.scrollIntoView({ behavior: "smooth" });
        // same as:
        // if (messagesFooter.current)
        //     messagesFooter.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        // console.log(data);
        if (!active) {
            if (data.chatBox.messages.length > 0) {
                // console.log("incre badge");
                increBadge();
            } else {
                // console.log("reset badge");
                resetBadge();
            }
        }

    }, [data]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_ADDED_SUBSCRIPTION,
                variables: { name1: user, name2: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.messageAdded.data;
                    return {
                        chatBox: {
                            id: prev.chatBox.id,
                            messages: [...prev.chatBox.messages, newMessage],
                        },
                    };
                },
            });
        } catch (e) {
            console.log(e.message);
        }

    }, [subscribeToMore, user, friend]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: CHATBOX_CLEARED_SUBSCRIPTION,
                variables: { name1: user, name2: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const message = subscriptionData.data.chatBoxCleared;
                    displayStatus({
                        type: "info",
                        msg: message,
                    });
                    return {
                        chatBox: {
                            id: prev.chatBox.id,
                            messages: [],
                        },
                    };
                },
            });
        } catch (e) {
            console.log(e.message);
        }
    }, [subscribeToMore, user, friend, displayStatus]);

    if (loading) return <p>loading</p>;

    return (
        <Messages>
            {data.chatBox.messages.map(({ sender, body }, idx) => (
                <Message user={user} name={sender} body={body} key={sender + body + idx} />
            ))}
            <div ref={messagesFooter} />
        </Messages>
    );
};

export default ChatBox;