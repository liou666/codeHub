const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path")

const private_key = fs.readFileSync(path.resolve("./app/keys/private.key"))
const public_key = fs.readFileSync(path.resolve("./app/keys/public.key"))

class Authorize {
    login(ctx, next) {
        //登录成功派发令牌
        const { id, username } = ctx.userInfo;
        const token = jwt.sign(ctx.userInfo, private_key, { algorithm: "RS256", expiresIn: 60 * 60 * 24 })
        ctx.body = {
            id,
            username,
            token,
            msg: "登录成功"
        }
    }
}

module.exports = new Authorize()