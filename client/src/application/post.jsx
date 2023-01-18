import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, GET_USER } from "./grapQueries";
import { DELETE_POST } from "./graphMutations";
import { EditPost } from "./modals";

export default function Post(props) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            id: props.userId
        }
    })
    const [deletePost] = useMutation(
        DELETE_POST, {
            variables: {
                id: props.id
            },
            update(cache, { data: {deletePost}}) {
                const {posts} = cache.readQuery({
                    query: GET_POSTS
                });
                cache.writeQuery({
                    query: GET_POSTS,
                    data: {
                        posts: posts.filter(post => post.id !== deletePost.id)
                    }
                })
            }
        }
    )
    return (
        <section className="post-block">
            <section className="post-content">
                <header className="post-block-header">
                    <span className="title">{props.title}</span>
                    {
                        !loading && !error && data.user !== null ?
                            <span className="author">{data.user.firstName} {data.user.lastName}</span>:
                            <span className="author">Untitled</span>
                    }
                </header>
                <article className="inner-content">{props.content}</article>
            </section>
            <nav className="post-features">
                <button className="button delete-button material-symbols-sharp" onClick={deletePost}>delete</button>
                <EditPost key={props.id} id={props.id} title={props.title} content={props.content}/>
            </nav>
        </section>
    )
}