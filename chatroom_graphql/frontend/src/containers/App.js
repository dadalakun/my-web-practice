import SignIn from "./SignIn";
import ChatRoom from "./ChatRoom";
import { useState, useEffect } from "react";
import { message } from "antd";
import styled from "styled-components";

const LOCALSTORAGE_KEY = "save-me";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 450px;
    margin: auto;
`;

const App = () => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(savedMe || "");
    // const [signedIn, setSignedIn] = useState(true);
    // const [user, setUser] = useState("Mumi");

    const displayStatus = (payload) => {
        if (payload.msg) {
          const { type, msg } = payload;
          const content = { content: msg, duration: 1.5 }
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
    };

    useEffect(( ) => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, user);
        }
    }, [signedIn, user]);

    return (
        <Wrapper>
            {signedIn ? (
                <ChatRoom 
                    user={user}
                    displayStatus={displayStatus}
                />
            ) : (
                <SignIn 
                    user={user}
                    setUser={setUser}
                    setSignedIn={setSignedIn}
                    displayStatus={displayStatus}
                />
            )}
        </Wrapper>
    );
}

export default App;