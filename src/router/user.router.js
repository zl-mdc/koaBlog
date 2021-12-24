// const koa =require('koa')
const {create} =require('../controller/user.controller')
const Router = require('koa-router')
const {verifyUser,handlePassword} =require('../middleware/user.middleware')
// const app = new ko()
const userRouter =new Router({prefix:'/users'})
// userRouter.post('/',(ctx,next)=>{
//     ctx.body="用户创建成功"
// })
userRouter.post('/',verifyUser,handlePassword,create)
module.exports=userRouter