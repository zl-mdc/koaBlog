const errorType=require('../constants/error-types')

const errorHandle =(error,ctx)=>{
    let status,meeage;
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400
            message="用户名和密码不能为空"
            break;
        case errorType.USER_ALREADY_EXISTS:
            status=409
            message="用户名已经存在"
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status=400
            message="用户名不存在"
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status=400
            message="密码是不正确的"
            break;
        case errorType.UNAUTHORIZATION:
            status=401
            message="未授权"
            break;
        case errorType.UNPERMISSION:
            status=401
            message="你不具备操作的权限"
            break;    
        default:
            status=404
            message="NOT FOUND"
            break;
    }
    // console.log(error);
    ctx.status=status
    ctx.body=message
}
module.exports=errorHandle