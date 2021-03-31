const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path")

const userServer = require("../service/user.serve");
const md5 = require("../utils/password.handle")
const {
    getUserByType
} = require("../service/moment.server")


const public_key = fs.readFileSync(path.resolve("./app/keys/public.key"))

//登陆验证
async function validUser(ctx, next) {
    const { username, password } = ctx.request.body;
    //判断账号和密码是否为空

    if (!username || !password) {
        const error = new Error("username and password is necessary");
        return ctx.app.emit("error", error, ctx);
    }
    const result = await userServer.getUserByName(ctx.request.body);
    //判断用户名是否存在
    if (!result || result.length === 0) {
        const error = new Error("username is not exits");
        return ctx.app.emit("error", error, ctx);
    }

    //判断账号和密码是否正确
    if (result[0].password !== md5(password)) {
        const error = new Error("password is incorrect");
        return ctx.app.emit("error", error, ctx);
    }
    const { id } = result[0];
    ctx.userInfo = { id, username }
    await next()
}

//验证token
async function validAuth(ctx, next) {
    console.log("验证token。。。");
    const authorization = ctx.request.header.authorization;
    if (!authorization) {
        const error = new Error("未授权");
        return ctx.app.emit("error", error, ctx);
    }
    try {
        const token = authorization.replace("Bearer ", "")
        const user = jwt.verify(token, public_key);

        ctx.user = user;
    } catch (err) {
        console.log(err);
        const error = new Error("token无效");
        return ctx.app.emit("error", error, ctx);
    }
    await next()
}

//验证是否有操作权限
async function validPermission(ctx, next) {
    console.log("验证权限。。。");
    const permissionType = Object.keys(ctx.params)[0].replace("Id", '');
    const id = ctx.params[Object.keys(ctx.params)[0]];
    const result = await getUserByType(permissionType, id);

    //判断此字段是否参在
    if (!result) {
        const error = new Error("此id不存在");
        return ctx.app.emit("error", error, ctx);
    }
    //判断是否拥有权限
    if (result.user_id !== ctx.user.id) {
        const error = new Error("您没有操作权限");
        return ctx.app.emit("error", error, ctx);
    }
    await next()
}

module.exports = {
    validUser,
    validAuth,
    validPermission
}