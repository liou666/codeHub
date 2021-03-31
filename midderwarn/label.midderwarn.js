const { getUserByType } = require("../service/moment.server");
async function validMonentIsExist(ctx, next) {
    const permissionType = Object.keys(ctx.params)[0].replace("Id", '');
    const id = ctx.params[Object.keys(ctx.params)[0]];
    const result = await getUserByType(permissionType, id);
    if (!result) {
        console.log(result);
        const error = new Error("不存在该动态");
        return ctx.app.emit("error", error, ctx);
    }
    await next()
}


module.exports = {
    validMonentIsExist
}