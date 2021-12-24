const koa =require('koa')
const Router = require('koa-router')
const userRouter = require('../router/user.router')
const authRouter=require('../router/auth.router')
const app = new koa()
const bodyParser = require('koa-bodyparser');
const errorHandle = require('./error-handle')
const useRoutes=require('../router/index')
// const userRouter =new Router({prefix:'/users'})
// userRouter.post('/',(ctx,next)=>{
//     ctx.body="用户创建成功"
// })
app.use(bodyParser())
useRoutes(app)
app.on('error',errorHandle)
module.exports=app