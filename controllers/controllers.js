const Post = require('../models/postsModel')
const User = require('../models/usersModel')
const { successHandler, errorHandler } = require('../service/handler');

const postController = {
    getPosts: async (req, res) => {
        const query = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const sort = req.query.sort == "dsc" ? {"createdAt": -1} : {'createdAt': 1};
        const getPosts = await Post.find(query).populate(
            {
                path: 'user',
                select: 'name photo',
            }
        ).sort(sort);
        successHandler(res, "所有貼文", getPosts);
    }, 
    getPostById: async (req, res, next) => {
        const id = req.params.id;
        if(id){
            const post = await Post.findById(id).populate(
                {
                    path: 'user',
                    select: 'name photo',
                }
            );
            successHandler(res, '取得該貼文', post);
        }else{
            errorHandler(res);
        }
    }, 
    createPost: async (req, res) => {
        try {
            const data = req.body;
            if(data.content){
                console.log(data.content);
                const newPost = await Post.create(data);
                console.log(newPost);
                const posts = await Post.find({}).populate(
                    {
                        path: 'user',
                        select: 'name photo',
                    }
                );
                successHandler(res, '新增一則貼文', posts);
            }else{
                errorHandler(res);
            }          
        } catch (error) {
            errorHandler(res, error);
        }
    },
    updatePost: async (req, res) => {
        try{
            const id = req.params.id;
            const data = req.body;
            if(data.content){
                await Post.findByIdAndUpdate(id, data)
                const getAllPosts = await Post.find().populate({
                    path: 'user',
                    select: 'name photo'
                })
                successHandler(res, '更新一則貼文', getAllPosts)
            }else{
                errorHandler(res)
            }
        }catch(err){
            errorHandler(res, err)
        }
    },
    deleteAllPost: async (req,res) => {
        await Post.deleteMany({})
        successHandler(res, '刪除全部貼文')
    },
    deletePost: async (req,res) => {
        try{
            const id = req.params.id;
            if(id){
                await Post.findByIdAndDelete(id)
                const getAllPosts = await Post.find().populate({
                    path: 'user',
                    select: 'name photo'
                })
                successHandler(res, '刪除一筆貼文', getAllPosts)
            }else{
                errorHandler(res)
            }
        }catch(err){
            errorHandler(res, err)
        }
    }
}

module.exports = postController;