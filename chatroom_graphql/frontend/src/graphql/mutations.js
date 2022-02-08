import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation signUp(
        $name: String!
        $password: String!
    ) {
        signUp (data: {
            name: $name
            password: $password
        })
    }
`;
export const SIGNIN_MUTATION = gql`
    mutation signIn(
        $name: String!
        $password: String!
    ) {
        signIn (data: {
            name: $name
            password: $password
        })
    }
`;
export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $from: String!
        $to: String!
        $body: String!
    ) {
        createMessage (
            from: $from
            to: $to
            body: $body
        ) {
            sender
            body
        }
    }
`;
export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ) {
        createChatBox (
            name1: $name1
            name2: $name2
        ) {
            name
            messages {
                sender
                body
            }
        }
    }
`;

export const CLEAR_CHATBOX_MUTATION = gql`
    mutation clearChatBox(
        $name1: String!
        $name2: String!
    ) {
        clearChatBox (
            name1: $name1
            name2: $name2
        ) {
            name
            messages {
                sender
                body
            } 
        }
    }
`;