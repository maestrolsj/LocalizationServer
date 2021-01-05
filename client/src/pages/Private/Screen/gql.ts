import gql from "graphql-tag";

export const projectsQuery = gql`
  query Screen_project($id: ID!) {
    project(where: { id: $id }) {
      id
      key
      name
      description
      screens {
        id
        name
      }
      locales {
        id
        name
      }
    }
  }
`;
