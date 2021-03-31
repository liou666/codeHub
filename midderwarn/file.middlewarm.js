const multer = require("koa-multer")
const avatarUpload = multer({
    dest: "./upload"
})

const avatarHandle = avatarUpload.single("avatar")




module.exports = {
    avatarHandle
}