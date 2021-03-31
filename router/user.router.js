const KoaRouter = require("koa-router");
const userRouter = new KoaRouter({ prefix: "/users" })

const { validUser, handlePassword } = require("../midderwarn/user.midderwarn")
const { userRegister } = require("../controler/user.controler")

//注册用户接口
userRouter.post("/", validUser, handlePassword, userRegister)

module.exports = userRouter