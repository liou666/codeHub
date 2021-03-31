const app = require("./app")

const { USER_POST } = require("./app/config")



app.listen(USER_POST, () => {
    console.log(`serve is running ${USER_POST} port`);
})