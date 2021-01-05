import gql from "graphql-tag";

export const keyQuery = gql`
  query KeyFormModal_key($id: ID!) {
    key(where: { id: $id }) {
      id
      name
      plural
    }
  }
`;

export const upsertKeyMutation = gql`
  mutation KeyFormModal_upsertKey(
    $id: ID
    $name: String!
    $plural: Boolean!
    $screenId: ID!
  ) {
    upsertKey(
      data: { name: $name, plural: $plural, screenId: $screenId }
      where: { id: $id }
    ) {
      id
      name
      plural
    }
  }
`;
