import { gql } from '@apollo/client';

export const USER_EXIST_QUERY = gql`
  query userExist($name: String!) {
    userExist(name: $name)
  }
`;

export const CHATBOX_QUERY = gql`
  query loadChatBox (
    $name1: String!
    $name2: String!
  ) {
    chatBox (
      name1: $name1
      name2: $name2
    ) {
      id
      messages {
        sender
        body
      }
    }
  }
`;
