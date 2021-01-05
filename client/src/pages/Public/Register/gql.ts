import gql from "graphql-tag";

export default gql`
  mutation RegisterPage_upsertUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    upsertUser(
      data: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
