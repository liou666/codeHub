const userServer = require("../service/user.serve");
const md5 = require("../utils/password.handle")

//注册验证
async function validUser(ctx, next) {
    //判断账号和密码是否为空
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        const error = new Error("username and password is necessary");
        return ctx.app.emit("error", error, ctx);
    }
    //判断用户名是否被注册过
    const result = await userServer.getUserByName(ctx.request.body);
    if (result.length !== 0) {
        const error = new Error("username has been register");
        return ctx.app.emit("error", error, ctx);
    }

    await next()
}

//密码加密
async function handlePassword(ctx, next) {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5(password);
    await next()
}


module.exports = {
    validUser,
    handlePassword
}

