import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterModal from './RegisterModal'
import Title from '../components/Title'

import {
    SIGNUP_MUTATION,
    SIGNIN_MUTATION
} from '../graphql';

const SignIn = ({ user, setUser, setSignedIn, displayStatus }) => {
    const [ModalVisible, setModalVisible] = useState(false);
    const [signup] = useMutation(SIGNUP_MUTATION);
    const [signin] = useMutation(SIGNIN_MUTATION);

    // SignIn
    const onFinish = async ({ username, password }) => {
        try {
            await signin({
                variables: {
                    name: username,
                    password: password
                }
            });
            setSignedIn(true);
        } catch (e) {
            displayStatus({
                type: "error",
                msg: e.message,
            });
        }
    }
    // Click "register" => Show the register modal
    const handleRegClick = () => { setModalVisible(true); }

    const handleRegCancel = () => { setModalVisible(false); }

    // Submit the register modal to the server
    const createUser = async (username, password) => {
        try {
            await signup({
                variables: {
                    name: username,
                    password: password
                }
            });
            setModalVisible(false);
        } catch (e) {
            displayStatus({
                type: "error",
                msg: e.message,
            });
        }
    }

    return (
        <>
            <RegisterModal isVisible={ModalVisible} onCreate={createUser} onCancel={handleRegCancel} />
            <Title>
                <h1>My Chat Room</h1>
            </Title>
            <Form
                name="normal_login"
                style={{ width: "250px", margin: "0px auto" }}
                fields={[{ name: ['username'], value: user }]}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Missing username!',
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
                            message: 'Missing Password!',
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
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Sign in
                    </Button>
                    Or <span onClick={handleRegClick} style={{ cursor: 'pointer', color: 'hotpink', textDecoration: 'underline' }}>
                        register
                    </span>
                </Form.Item>
            </Form>
        </>
    );
}

export default SignIn;