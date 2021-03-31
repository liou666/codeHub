const { addCommentServer, updateCommentServer, deleteCommentServer } = require("../service/comment.server")

class Comment {
    async addComment(ctx, next) {
        const { content, moment_id, comment_id = null } = ctx.request.body;
        const user_id = ctx.user.id;

        const commentDetial = { content, moment_id, comment_id, user_id }
        const result = await addCommentServer(commentDetial);

        ctx.body = "评论成功"
    }
    async updateComment(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body
        const result = await updateCommentServer(commentId, content);
        ctx.body = "修改成功"
    }
    async deleteComment(ctx, next) {
        const { commentId } = ctx.params;
        const result = await deleteCommentServer(commentId);
        ctx.body = "删除成功"
    }

}

module.exports = new Comment()