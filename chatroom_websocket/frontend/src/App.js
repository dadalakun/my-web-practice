import './App.css'
import { useEffect, useState } from 'react'
import { message } from 'antd'
/** Version without passward */
// import SignIn from './containers/SignIn'
/** Version with passward */
import LogIn from './containers/LogIn'
import Title from './components/Title'
import useChat from './hooks/useChat'
import ChatRoom from './containers/ChatRoom'

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
const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { isSignIn, status, addUser, login } = useChat();
  const [user, setUser] = useState(savedMe || '');
  // const [issignin, setIsSignIn] = useState(false);

  useEffect(() => {
    displayStatus(status)
  }, [status])

  useEffect(() => {
    if (isSignIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, user);
    }
  }, [isSignIn, user])

  const mainpage =
    <>
      <Title>
        <h1>{`${user}'s Chat Room`}</h1>
      </Title>
      <ChatRoom user_from={user} displayStatus={displayStatus} />
    </>

  return (
    <div className="App">
      {
        (isSignIn) ? mainpage :
          <LogIn
            user={user}
            setUser={setUser}
            addUser={addUser}
            login={login}
            displayStatus={displayStatus}
          />
        // <SignIn
        //   user={user}
        //   setUser={setUser}
        //   setSignedIn={setIsSignIn}
        //   displayStatus={displayStatus}
        // />
      }
    </div>
  )
}

export default App
