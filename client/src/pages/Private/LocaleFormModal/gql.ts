import gql from "graphql-tag";

export const localesQuery = gql`
  query LocaleFormModal_locale($id: ID!) {
    locale(where: { id: $id }) {
      id
      name
      code
      nativeName
    }
  }
`;

export const upsertLocaleMutation = gql`
  mutation LocaleFormModal_upsertLocale(
    $id: ID
    $name: String!
    $nativeName: String!
    $code: String!
    $projectId: ID!
  ) {
    upsertLocale(
      data: {
        name: $name
        nativeName: $nativeName
        code: $code
        projectId: $projectId
      }
      where: { id: $id }
    ) {
      id
      name
      nativeName
      code
    }
  }
`;
