const KoaRouter = require("koa-router");



const { avatarHandle } = require("../midderwarn/file.middlewarm")
const { avaterServerHandle, viewAvatar } = require("../controler/file.controler")

const {
    validAuth
} = require("../midderwarn/auth.middle")

const fileRouter = new KoaRouter({ prefix: "/upload" })


//上传头像
fileRouter.post("/avatar", validAuth, avatarHandle, avaterServerHandle)
//查看头像
fileRouter.get("/:userId", viewAvatar)

module.exports = fileRouter