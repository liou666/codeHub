const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "000000",
    database: "studynode",
    connectionLimit: 20
});

//判断是否连接成功
pool.getConnection((err, conn) => {
    if (!err) console.log("数据库启动成功");
})

module.exports = pool.promise()