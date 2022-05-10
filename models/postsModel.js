const mongoose = require('mongoose')
const db = require('./db')
const postSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: [true, 'Content 未填寫']
      },
      image: {
        type:String,
        default:""
      },
      createdAt: {
        type: Date,
        default: Date.now,
        select: true 
      },
      user: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
          required: [true, '貼文 ID 未填寫']
      },
      likes: {
          type:Number,
          default:0
        }
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;