const KoaRouter = require("koa-router");


const {
    addMoment,
    updateMoment,
    getMomentById,
    getMomentList,
    deleteMoment
} = require("../controler/moment.controler")
const {
    addLabel
} = require("../controler/label.controler")
const {
    validAuth,
    validPermission
} = require("../midderwarn/auth.middle")
const {
    validMonentIsExist
} = require("../midderwarn/moment.middle")

const momontRouter = new KoaRouter({ prefix: "/moment" })


//发表动态
momontRouter.post("/", validAuth, addMoment, addLabel);

//修改动态
momontRouter.patch("/:momentId", validAuth, validPermission, updateMoment);

//删除动态
momontRouter.delete("/:momentId", validAuth, validPermission, deleteMoment);

//查询动态(单个)
momontRouter.get("/:momentId", validAuth, validMonentIsExist, getMomentById);

//分页查询
momontRouter.get("/", validAuth, getMomentList);


module.exports = momontRouter