module.exports = (error, ctx) => {
    switch (error.message) {
        case "username and password is necessary":
            ctx.status = 400
            ctx.body = "username and password is necessary"
            break;
        case "username has been register":
            ctx.status = 409
            ctx.body = " username has been register"
            break;
        case "password is incorrect":
            ctx.status = 400
            ctx.body = "password is incorrect"
            break;
        case "username is not exits":
            ctx.status = 409
            ctx.body = "username is not exits"
            break;
        case "token无效":
            ctx.status = 401
            ctx.body = "token无效"
            break;
        case "未授权":
            ctx.status = 401
            ctx.body = "未授权"
            break;
        case "您没有操作权限":
            ctx.status = 401
            ctx.body = "您没有操作权限"
            break;
        case "此id不存在":
            ctx.status = 401
            ctx.body = "此id不存在"
            break;
        case "不存在该动态":
            ctx.status = 401
            ctx.body = "不存在该动态"
            break;
        default:
            ctx.status = 404
            ctx.body = "Not Found"
    }
}
