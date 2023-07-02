import { gql } from "@apollo/client";

export const GET_ENTS_QUERY = gql`
  query getEnts($paginationInput: PaginationInput!, $filterInput: FilterInput) {
    getEnts(paginationInput: $paginationInput, filterInput: $filterInput) {
      ents {
        id
        type
        title
        description
        parent {
          id
          title
        }
        createDate
        creator {
          id
          username
        }
        editDate
        editor {
          id
          username
        }
        organizations {
          id
          title
        }
        dependentCount
      }
      totalCount
    }
  }
`;

export const GET_ENT_QUERY = gql`
  query GetEnt($id: Int!) {
    getEnt(id: $id) {
      id
      type
      title
      description
      parent {
        id
        title
      }
      dependents {
        id
        type
        title
      }
      creator {
        username
        createDate
      }
      editor {
        username
        createDate
      }
    }
  }
`;

export const UPDATE_ENT_MUTATION = gql`
  mutation UpdateEnt($updateEntInput: UpdateEntInput!) {
    updateEnt(updateEntInput: $updateEntInput) {
      id
      type
      title
      description
      parent {
        id
      }
    }
  }
`;

export const CREATE_ENT_MUTATION = gql`
  mutation CreateEnt($createEntInput: CreateEntInput!) {
    createEnt(createEntInput: $createEntInput) {
      id
    }
  }
`;

export const DELETE_MUTATION = gql`
  mutation DeleteEnt($deleteEntInput: DeleteEntInput!) {
    deleteEnt(deleteEntInput: $deleteEntInput) {
      success
      message
    }
  }
`;
