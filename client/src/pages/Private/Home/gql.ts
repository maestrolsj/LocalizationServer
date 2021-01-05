import gql from "graphql-tag";

export default gql`
  query HomePage_projects {
    projects {
      id
      key
      name
      description
    }
  }
`;
