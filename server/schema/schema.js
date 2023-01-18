const { 
    GraphQLObjectType,  GraphQLSchema,  GraphQLID,
    GraphQLInt, GraphQLString, GraphQLNonNull,
    GraphQLList
} = require("graphql");

const User = require("../models/User");
const Post = require("../models/Post");

//const {users, posts} = require("../data/sampleData")

const UserType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID)
        },
        firstName: {
            type: GraphQLNonNull(GraphQLString)
        }, 
        lastName: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const PostType = new GraphQLObjectType({
    name: "post",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID)
        },
        userId: {
            type: GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLNonNull(GraphQLString)
        },
        content: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: "rootQuery", 
    fields: () => ({
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return User.findById(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve: () => {
                return User.find();
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Post.findById(args.id)
            }
        },
        posts: {
            type: GraphQLList(PostType),
            resolve: () => {
                return Post.find()
            }
        }
        
    })
})

const MutationQueryType = new GraphQLObjectType({
    name: "mutationQueryType",
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    type: GraphQLNonNull(GraphQLString)
                },
                lastName: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                const  user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email
                })

                return user.save()
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: {
                    type: GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: GraphQLNonNull(GraphQLString)
                },
                userId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
                const post = new Post({
                    title: args.title,
                    content: args.content,
                    userId: args.userId
                })

                return post.save()
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
                return User.findByIdAndRemove(
                    args.id
                )
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Post.findByIdAndRemove(args.id)
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email
                        },
                    },
                    {
                        new: true
                    }
                )
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                },
                title: {
                    type: GraphQLString
                },
                content: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            content: args.content
                        }
                    }, 
                    {
                        new: true
                    }
                )
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationQueryType
})

