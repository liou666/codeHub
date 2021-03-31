const { addLabelServer, getLabelByName, bindLabelMoment } = require("../service/label.server");
async function addLabel(ctx, next) {
    const { labels, momentId } = ctx;
    for (let i = 0; i < labels.length; i++) {
        const result = await getLabelByName(labels[i]);
        let labelId;
        if (!result.length) {
            labelId = (await addLabelServer(labels[i])).insertId;
        } else {
            labelId = result[0].id
        }
        await bindLabelMoment(momentId, labelId);
    }
    await next()

}


module.exports = {
    addLabel
}