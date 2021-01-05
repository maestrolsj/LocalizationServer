import gql from "graphql-tag";

export default gql`
  mutation RedefinePasswordPage_resetPassword(
    $password: String!
    $token: String!
  ) {
    resetPassword(password: $password, token: $token) {
      user {
        id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
      accessToken
    }
  }
`;
