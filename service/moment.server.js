const connection = require("../app/database");

class MomentServer {
    //发布动态
    async addMomentServer(content, id) {
        const sql = `insert into moment (content,user_id) values (?,?)`;
        const [result] = await connection.execute(sql, [content, id]);
        return result
    }
    //修改动态
    async updateMomentServer(momenntId, content) {
        const sql = `update moment set content=? where id=?`;
        const [result] = await connection.execute(sql, [content, momenntId]);
        return result
    }
    //动态查询（单个）
    async getMomentByIdServer(momentId) {
        const sql = `
        SELECT
            m.id,
            m.content,
            m.create_time,
            m.update_time,
            JSON_OBJECT( "user_id", m.user_id, "username", u.username ) AS userInfo,
        IF
            (
                COUNT( c.id ),
                JSON_ARRAYAGG( JSON_OBJECT( "commentId", c.comment_id, "content", c.content, "id", c.id, "userID", c.user_id ) ),
            NULL 
            ) AS commentInfo,
        IF
            ( COUNT( ml.moment_id ), JSON_ARRAYAGG( JSON_OBJECT( "labelId", ml.label_id, "labelName", l.NAME ) ), NULL ) AS labelInfo 
        FROM
            moment m
            LEFT JOIN users u ON m.user_id = u.id
            LEFT JOIN COMMENT c ON m.id = c.moment_id
            LEFT JOIN moment_label ml ON m.id = ml.moment_id
            LEFT JOIN label l ON l.id = ml.label_id 
        WHERE
            m.id = ?
        GROUP BY
            m.id
        `;
        const [result] = await connection.execute(sql, [momentId]);
        return result
    }
    //分页查询
    async getMomentListServer(currentIndex, pageSize) {
        const sql = `
        SELECT
            m.id,
            m.content,
            m.create_time,
            m.update_time,
            JSON_OBJECT( "user_id", m.user_id, "username", u.username ) AS userInfo,
            COUNT( c.id ) AS commentCount,
            COUNT( ml.moment_id ) AS labeCount 
        FROM
            moment m
            LEFT JOIN users u ON m.user_id = u.id
            LEFT JOIN COMMENT c ON m.id = c.moment_id
            LEFT JOIN moment_label ml ON m.id = ml.moment_id 
        GROUP BY
            m.id
    `;
        const [result] = await connection.execute(sql, [(currentIndex - 1) * pageSize, pageSize]);
        return result
    }
    //获取用户id通过动态id
    async getUserByType(permissionType, id) {
        const sql = `select user_id from ${permissionType} where id=? `;
        const [result] = await connection.execute(sql, [id]);
        return result[0]
    }
    //删除动态
    async deleteMomentServer(momentId) {
        const sql = `delete from moment where id=? `
        console.log(momentId);
        const [result] = await connection.execute(sql, [momentId]);
        console.log(result);
        return result
    }


}

module.exports = new MomentServer()