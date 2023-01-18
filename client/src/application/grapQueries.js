import {gql} from "@apollo/client";

const GET_USERS = (gql`
    query getUsers {
        users {
            id
            firstName
            lastName
            email
        }
    }
` )

const GET_USER = (gql`
    query getUser($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            email
        }
    }
`)

const GET_POSTS = (gql`
    query getPosts {
        posts {
            id
            title
            content
            userId
        }
    }
`)

export {GET_USERS, GET_POSTS, GET_USER};