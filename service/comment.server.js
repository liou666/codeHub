const connection = require("../app/database")
class CommentService {
    //新增评论
    async addCommentServer(commentDetial) {
        const { user_id, content, moment_id, comment_id = null } = commentDetial;

        const sql = `
            insert into 
                comment ( user_id, content, moment_id, comment_id)
            values (?,?,?,?)
        `

        const [result] = await connection.execute(sql, [user_id, content, moment_id, comment_id])

        return result
    }
    //修改评论
    async updateCommentServer(commentId, content) {
        const sql = `update comment set content=? where id=?`;
        const [result] = await connection.execute(sql, [content, commentId]);
        return result
    }
    //删除评论
    async deleteCommentServer(commentId) {
        const sql = `delete from comment where id=?`;
        const [result] = await connection.execute(sql, [commentId]);
        return result
    }

}

module.exports = new CommentService()