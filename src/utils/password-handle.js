const crypto = require('crypto');

const md5password=(password)=>{
    //告诉加密方式是什么，我们选择md5
    const md5= crypto.createHash('md5')
    //hex的意思是指定返回的植是16进制的
    const result = md5.update(password).digest('hex')
    return result
}
module.exports=md5password