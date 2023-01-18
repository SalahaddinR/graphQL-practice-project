import {gql} from "@apollo/client";

const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email) {
            id
            firstName
            lastName
            email
        }
    }
`

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
            firstName
            lastName
            email
        }
    }
`;

const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            id 
        }
    }
`

const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $title: String!, $content: String!) {
        updatePost(id: $id, title: $title, content: $content) {
            id
            title
            content
        }
    }
`

export {ADD_USER, DELETE_USER, DELETE_POST, UPDATE_POST};