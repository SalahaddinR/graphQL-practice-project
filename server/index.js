const express = require("express");
const cors =  require("cors");
const {graphqlHTTP} = require("express-graphql");

const schema = require("./schema/schema");
const { connectDB } = require("./config/database");

const app = express()

connectDB()

app.use(cors())

app.use(
    "/graphql", graphqlHTTP({
        graphiql: true,
        schema: schema
    })
)

app.listen(5300, () => console.log("server started on http://localhost:5300/"))

