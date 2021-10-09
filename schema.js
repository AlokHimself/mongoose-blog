const mongoose = require('mongoose'), Schema= mongoose.Schema

async function definePosts(){

    await mongoose.connect('mongodb://localhost:27017/blog');

    // create a new schema for our posts
    const postSchema = new Schema({
        title: {
            type: String,
            required:[true, "Title is required"],
            minlength: 10
        },
        author: String,
        contents: String,
        status: {type: String, enum:["draft","published"]},
        publicationDate: Date
    })

    const commentSchema = new Schema({
        contents: String,
        publicationDate: Date,
        post: {type: Schema.Types.ObjectId, ref:'Post'}
    })

    // create a model
    const Post = mongoose.model("Post",postSchema)
    const Comment = mongoose.model("Comment",commentSchema)

    // let us create our first post
    const welcomePost = new Post({
        title: 2222,
        author: "Jhon Doe",
        contents: "Lorem Ipsum",
        status: "draft",
        publicationDate: new Date()
    })

    const comment = new Comment({
        contents: "Lorem Ipsum Comment",
        publicationDate: new Date(),
        post: welcomePost._id
    })
   

    await welcomePost.save()
    await comment.save()
    console.log(welcomePost)
    console.log(comment)


}


definePosts()