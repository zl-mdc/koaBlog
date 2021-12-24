const app =require('./app/app')
require('./app/database')
const config =require('./app/config')
app.listen(config.APP_PORT,()=>{
    console.log("启动成功",config.APP_PORT)
})