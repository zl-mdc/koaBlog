const errorType= require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle');
const verifyUser= async(ctx,next)=>{
    //1.获取用户名和密码
    const {username,password} =ctx.request.body

    //2.判断用户名不能为空
    if(!username||!password||username===''||password===''){
                const error =new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
             return   ctx.app.emit("error",error,ctx)
    }


    //3.判断用户名和密码有没有被注册过
    const result = await service.getUserByName(username)
    // console.log(result);
    if(result.length){
        const error=new Error(errorType.USER_ALREADY_EXISTS)
       return  ctx.app.emit('error',error,ctx)
    }



    await next()
}

const handlePassword=async(ctx,next)=>{ 
        let {password}= ctx.request.body
        ctx.request.body.password=md5password(password)


        //next的意识是去执行后面的create中间件
        await next()
}
module.exports={
    verifyUser,
    handlePassword
}