const connection = require("../app/database");

class LabelServer {
    //添加标签
    async addLabelServer(labelName) {
        const sql = `insert into label (name) values (?)`;
        const [result] = await connection.execute(sql, [labelName]);
        return result
    }
    //判断是否存在此标签
    async getLabelByName(labelName) {
        const sql = `select * from label where name=?`;
        const [result] = await connection.execute(sql, [labelName]);
        return result
    }
    //绑定关系表
    async bindLabelMoment(momentId, labelId) {
        const sql = `insert into moment_label (moment_id,label_id) values (?,?)`;
        const [result] = await connection.execute(sql, [momentId, labelId]);
        return result
    }
}

module.exports = new LabelServer()