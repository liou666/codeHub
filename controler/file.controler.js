const fs = require("fs")

const { avaterServer, getAvaterById } = require("../service/file.server")

class FileControler {
    async avaterServerHandle(cxt, next) {
        const { filename, mimetype, size } = cxt.req.file;
        const { id } = cxt.user;
        const result = await avaterServer(filename, mimetype, size, id);
        cxt.body = result;
    }
    async viewAvatar(cxt, next) {
        const { userId } = cxt.params;
        const result = await getAvaterById(userId);
        cxt.response.set("content-type", result.mimetype)
        cxt.body = fs.createReadStream("./upload/" + result.filename)
    }

}

module.exports = new FileControler()