const connection = require("../app/database");


class userServer {
    //注册新用户
    async userRegister(user) {
        const { username, password } = user;
        const sql = "insert into users (username, password) values (?,?)";
        const result = await connection.execute(sql, [username, password]);
        return result[0]
    };
    //查询用户是否存在
    async getUserByName(user) {
        const { username } = user;
        const sql = "select * from users where username=?";
        const result = await connection.execute(sql, [username]);
        return result[0]
    };
}


module.exports = new userServer()