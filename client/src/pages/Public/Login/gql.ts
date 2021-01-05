import gql from "graphql-tag";

export default gql`
  query LoginPage_login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
