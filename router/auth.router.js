const KoaRouter = require("koa-router");

const { login } = require("../controler/auth.controler")
const { validUser, validAuth } = require("../midderwarn/auth.middle")

const authRouter = new KoaRouter()


//用户登录接口
authRouter.post("/login", validUser, login)


module.exports = authRouter