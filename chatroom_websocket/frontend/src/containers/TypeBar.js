import { useState } from 'react'
import { Input } from 'antd';

const TypeBar = ({ user_from, activeTab, displayStatus, sendMessage, disabled }) => {
    const [body, setBody] = useState('');
    return (
        <Input.Search
            value={body} 
            enterButton="Send"
            placeholder="Type messages here..."
            onChange={(e) => setBody(e.target.value)}
            onSearch={(msg) => {
                if (!msg) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter some messages.'
                    })
                    return;
                }
                sendMessage({ boxname: activeTab, msg: { name: user_from, body: msg } })
                setBody('');
            }}
            disabled={disabled}
            style={{ width: '75%' }}
        ></Input.Search>
    );
}

export default TypeBar