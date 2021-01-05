import gql from "graphql-tag";

export const projectsQuery = gql`
  query ProjectFormModal_project($id: ID!) {
    project(where: { id: $id }) {
      id
      key
      name
      description
    }
  }
`;

export const upsertProjectMutation = gql`
  mutation ProjectFormModal_upsertProject(
    $id: ID
    $key: String!
    $name: String!
    $description: String!
  ) {
    upsertProject(
      data: { key: $key, name: $name, description: $description }
      where: { id: $id }
    ) {
      id
      key
      name
      description
    }
  }
`;
