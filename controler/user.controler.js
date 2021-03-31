const userServer = require("../service/user.serve")

class User {
    //用户注册
    async userRegister(ctx, next) {
        const result = await userServer.userRegister(ctx.request.body)
        if (result.affectedRows !== 0) {
            ctx.body = "注册成功"
        } else {
            ctx.body = "注册失败"
        }
    }
}

module.exports = new User()

