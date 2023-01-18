import React from "react";
import { useMutation } from "@apollo/client"; 
import { GET_USERS } from "./grapQueries";
import { DELETE_USER } from "./graphMutations";

export default function User(props) {
    const [deleteUser] = useMutation(DELETE_USER, {
        variables: {
            id: props.id
        },
        update(cache, { data: {deleteUser} }) {
            const {users} = cache.readQuery({
                query: GET_USERS
            });
            cache.writeQuery({
                query: GET_USERS,
                data: {
                    users:  users.filter(user => user.id !== deleteUser.id)
                }
            });
        }
    })
    return (
        <section className="user-row">
            <span className="row-name">{props.firstname} {props.lastname}</span>
            <span className="row-email">{props.email}</span>
            <button className="material-symbols-sharp row-delete"  onClick={deleteUser}>delete</button>
        </section>
    )
}
