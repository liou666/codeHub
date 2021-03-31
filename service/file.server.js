const connection = require("../app/database")

class FileServer {
    async avaterServer(filename, mimetype, size, user_id) {

        const sql1 = `insert into avatar (filename, mimetype, size, user_id) values (?,?,?,?)`;
        const [result] = await connection.execute(sql1, [filename, mimetype, size, user_id]);

        //将avaterUrl存储到用户信息中
        // const sql2 = `update  users set (avatar) values (?) where id=?`;
        // await connection.execute(sql2, [result., user_id]);
        return result
    }
    async getAvaterById(id) {
        const sql = `select * from avatar where user_id=?`;
        const [result] = await connection.execute(sql, [id]);
        return result[0]


    }
}

module.exports = new FileServer()