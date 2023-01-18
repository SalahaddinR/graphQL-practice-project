import React from 'react'
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import './styles/app.scss'

import Header from './header'
import Users from './users';
import Posts from './posts';
import { CreateUser } from './modals';
import {Route, Routes} from "react-router-dom";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                users: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                posts: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
})

const client  = new ApolloClient({
    uri: "http://localhost:5300/graphql",
    cache: cache
})

export function UsersSection() {
    return (
        <>
            <section className="features">
                <CreateUser />
            </section>
            <section className="content">
                <Users />
            </section>
        </>
    )
}

export function PostsSection() {
    return (
        <>
            <section className="features">
            
            </section>
            <section className="content">
                <Posts />
            </section>
        </>
    )
}

export default function App() {
    return (
        <ApolloProvider client={client}>
            <section className="application">
                <Header />
                <Routes>
                    <Route path="/users" element={<UsersSection />} />
                    <Route path="/posts" element={<PostsSection />} />
                </Routes>
            </section>
        </ApolloProvider>
    )
}