const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Post", PostSchema);