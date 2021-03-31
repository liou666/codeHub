const KoaRouter = require("koa-router");


const {
    addComment,
    updateComment,
    deleteComment
} = require("../controler/comment.controler")
const {
    validAuth,
    validPermission
} = require("../midderwarn/auth.middle")


const commentRouter = new KoaRouter({ prefix: "/comment" })


//发表评论
commentRouter.post("/", validAuth, addComment);

//修改评论
commentRouter.put("/:commentId", validAuth, validPermission, updateComment);

//删除评论
commentRouter.delete("/:commentId", validAuth, validPermission, deleteComment);


module.exports = commentRouter