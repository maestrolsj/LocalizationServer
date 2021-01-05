import gql from "graphql-tag";

export const screensQuery = gql`
  query ScreenFormModal_screen($id: ID!) {
    screen(where: { id: $id }) {
      id
      key
      name
      description
    }
  }
`;

export const upsertScreenMutation = gql`
  mutation ScreenFormModal_upsertScreen(
    $id: ID
    $key: String!
    $name: String!
    $description: String!
    $projectId: ID!
  ) {
    upsertScreen(
      data: {
        key: $key
        name: $name
        description: $description
        projectId: $projectId
      }
      where: { id: $id }
    ) {
      id
      key
      name
      description
    }
  }
`;
