import React from "react";
import { useMutation } from "@apollo/client";
import { GET_USERS } from "./grapQueries";
import { ADD_USER, UPDATE_POST } from "./graphMutations";

export function CreateUser() {
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [addUser] = useMutation(ADD_USER,
        {
            variables: {
                firstName: firstname,
                lastName: lastname,
                email: email
            },
            update(cache, { data: {addUser}} ) {
                const {users} = cache.readQuery({
                    query: GET_USERS
                });

                cache.writeQuery({
                    query: GET_USERS,
                    data: {
                        users: [...users, addUser]
                    }
                })
            }
        }    
    )

    const handleFormSending = () => {
        if (firstname !== '' && lastname !== '' && email !== '') {
            setFirstName(''); setLastName(''); setEmail('');
            addUser(firstname, lastname, email)
        }

    }

    return (
        <>
            <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center gap-3" data-bs-toggle="modal" data-bs-target="#updatePostModel">
                <span className="material-symbols-sharp" >
                    person
                </span>
                Add User 
            </button>

            <div className="modal fade" id="updatePostModel" tabIndex="-1" aria-labelledby="updatePostModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updatePostModelLabel">Add User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" id="name" className="form-control" value={firstname} autoComplete="off" onChange={(element) => setFirstName(element.target.value)}/>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value={lastname} autoComplete="off" onChange={(element) => setLastName(element.target.value)}/>
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={email} autoComplete="off" onChange={(element) => setEmail(element.target.value)}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleFormSending} data-bs-dismiss="modal">Add User</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function EditPost(props) {
    const [id, setId] = React.useState(props.id);
    const [title, setTitle] = React.useState(props.title);
    const [content, setContent] = React.useState(props.content);
    const [updatePost] = useMutation(UPDATE_POST, {
        variables: {
            id: id,
            title: title,
            content: content
        }
    })
    
    const handleSubmit = () => {
        if (title !== props.title || content !== props.content) {
            updatePost(id, title, content);
        }
    }

    return (
        <>
            <button type="button" className="button btn btn-warning d-flex justify-content-center align-items-center gap-3 material-symbols-sharp" data-bs-toggle="modal" data-bs-target={`#updatePostModel-${id}`}>
                <span className="material-symbols-sharp">edit</span>
            </button>

            <div className="modal fade" id={`updatePostModel-${id}`} tabIndex="-1" aria-labelledby={`updatePostModelLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`updatePostModelLabel-${id}`}>Edit Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" id="title" className="form-control" autoComplete="off" value={title} onChange={(element) => setTitle(element.target.value)} />
                                    <label className="form-label">Content</label>
                                    <textarea name="" id="content" cols="30" rows="10" className="form-control" value={content} autoComplete="off" onChange={(element) => setContent(element.target.value)}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}