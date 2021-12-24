const errorType= require('../constants/error-types')
const service = require('../service/user.service')
const authService =require('../service/auth.service')
const jwt =require('jsonwebtoken')
const md5password =require('../utils/password-handle')
const {PUBLIC_KEY} =require('../app/config')
const verifyLogin = async(ctx,next)=>{
    //1.获取用户名和密码
    const {username,password}  =ctx.request.body
    //2.判断用户名和密码是否为空
    if(!username||!password||username===''||password===''){
        const error =new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
     return   ctx.app.emit("error",error,ctx)
}

    //3.判断用户是否存在
    const result = await service.getUserByName(username)
    console.log(result);
    const user= result[0]
    if(!user){
        const error=new Error(errorType.USER_DOES_NOT_EXISTS)
       return  ctx.app.emit('error',error,ctx)
    }

    //4.判断用户与数据库数据是否一致
    if(md5password(password)!==user.password){
        const error =new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }
    ctx.user=user
    await next()
}
const verifyAuth=async (ctx,next)=>{
        // console.log("验证授权");
        // console.log('1111',ctx.headers.authorization);
        const authorization = ctx.headers.authorization
        if(!authorization){
            const error = new Error(errorType.UNAUTHORIZATION)
            return ctx.app.emit('error',error,ctx)
        }
        const token = authorization.replace("Bearer ","")
     try {
        const result= jwt.verify(token,PUBLIC_KEY,{
            algorithms:["RS256"]
        })
        ctx.body=result
        await next()
     } catch (err) {
         const error = new Error(errorType.UNAUTHORIZATION)
         ctx.app.emit('error',error,ctx)
     } 
}
const verifyPermission= async(ctx,next)=>{ 
    //获取参数
    const {momentId} = ctx.params
    const { id} =ctx.user
    //查询是否具有权限
    const isPermission=await authService.checkMoment(momentId,id)
    if(!isPermission){
        const error =new Error('')
    }
    await next()
}

module.exports= {verifyLogin,verifyAuth,verifyPermission}