import { gql } from '@apollo/client';

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription(
    $name1: String!
    $name2: String! 
  ) {
    messageAdded (
      name1: $name1
      name2: $name2
    ) {
      mutation
      data {
        sender
        body
      }
    }
  }
`;

export const CHATBOX_CLEARED_SUBSCRIPTION = gql`
  subscription(
    $name1: String!
    $name2: String! 
  ) {
    chatBoxCleared (
      name1: $name1
      name2: $name2
    )
  }
`;