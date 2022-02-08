import { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterModal from '../components/RegisterModal'
import Title from '../components/Title'

const LogIn = ({ user, setUser, addUser, login }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onFinish = ({ username, password }) => {
        // console.log(`Received values of form: { ${username} , ${password} }`);
        login(username, password);
    }
    // Clicking the register button => show the modal
    const registerClick = () => {
        setIsModalVisible(true);
    }
    const registerCancel = () => { setIsModalVisible(false); }
    // Submit the register modal to the server
    const createUser = (username, password) => {
        addUser(username, password);
        setIsModalVisible(false);
    }

    return (
        <>
            <RegisterModal isVisible={isModalVisible} onCreate={createUser} onCancel={registerCancel} />
            <Title>
                <h1>My Chat Room</h1>
            </Title>
            <Form
                name="normal_login"
                className="login-form"
                fields={[{name:['username'], value: user}]}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={"Username"}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <span onClick={registerClick} style={{ cursor: 'pointer', color:'hotpink', textDecoration: 'underline' }}>register</span>
                </Form.Item>
            </Form>
        </>
    );
}

export default LogIn