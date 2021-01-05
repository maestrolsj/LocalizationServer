import gql from "graphql-tag";

export const projectQuery = gql`
  query TranslatePage_project($id: ID!) {
    project(where: { id: $id }) {
      locales {
        id
        name
        nativeName
        code
      }
    }
  }
`;

export const screenQuery = gql`
  query TranslatePage_screen($id: ID!) {
    screen(where: { id: $id }) {
      id
      name
      description
      keys {
        id
        name
        plural
        translations {
          id
          value
          locale {
            id
          }
        }
      }
    }
  }
`;

export const deleteKeyMutation = gql`
  mutation TranslatePage_deleteKey($id: ID!) {
    deleteKey(where: { id: $id })
  }
`;
