const {
    addMomentServer,
    updateMomentServer,
    getMomentByIdServer,
    getMomentListServer,
    deleteMomentServer
} = require("../service/moment.server")

class Moment {
    //发布动态
    async addMoment(ctx, next) {
        const { content, labels = [] } = ctx.request.body;
        const { id } = ctx.user;
        if (labels.length) {
            ctx.labels = labels
            const result = await addMomentServer(content, id)
            ctx.momentId = result.insertId
            await next()
        } else {
            await addMomentServer(content, id)
        }
        ctx.body = "发布成功"
    }
    //修改动态
    async updateMoment(ctx, next) {
        const { momentId } = ctx.params;
        const { content } = ctx.request.body
        const result = await updateMomentServer(momentId, content);
        ctx.body = result
    }
    //动态查询（单个）
    async getMomentById(ctx, next) {
        const { momentId } = ctx.params;
        const result = await getMomentByIdServer(momentId);
        ctx.body = result
    }

    //动态查询（分页查询）
    async getMomentList(ctx, next) {
        const { currentIndex = 1, pageSize = 10 } = ctx.query;
        const result = await getMomentListServer(currentIndex, pageSize);
        ctx.body = result
    }
    //删除动态
    async deleteMoment(ctx, next) {
        const { momentId } = ctx.params;
        const result = await deleteMomentServer(momentId);
        ctx.body = result
    }


}

module.exports = new Moment()