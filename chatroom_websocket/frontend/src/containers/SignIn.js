// import { Input } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import Title from '../components/Title'

/** SignIn page without password */
// const SignIn = ({ user, setUser, setSignedIn, displayStatus }) => (
//     <>
//         <Title>
//             <h1>My Chat Room</h1>
//         </Title>
//         <Input.Search
//             prefix={<UserOutlined />}
//             value={user}
//             enterButton="Sign in"
//             placeholder="User"
//             style={{ width: 300, margin: 50 }}
//             autoFocus={true}
//             onChange={(e) => setUser(e.target.value)}
//             onSearch={(name) => {
//                 if (!name) {
//                     displayStatus({
//                         type: 'info',
//                         msg: 'Please enter something.'
//                     })
//                     return;
//                 }
//                 setSignedIn(true);
//             }}
//         ></Input.Search>
//     </>
// )

// export default SignIn