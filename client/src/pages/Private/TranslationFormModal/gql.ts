import gql from "graphql-tag";

export const translationQuery = gql`
  query TranslationFormModal_translation($id: ID!) {
    translation(where: { id: $id }) {
      id
      value
    }
  }
`;

export const upsertTranslationMutation = gql`
  mutation TranslationFormModal_upsertTranslation(
    $id: ID
    $value: String!
    $keyId: ID!
    $localeId: ID!
  ) {
    upsertTranslation(
      data: { value: $value, keyId: $keyId, localeId: $localeId }
      where: { id: $id }
    ) {
      id
      value
    }
  }
`;
