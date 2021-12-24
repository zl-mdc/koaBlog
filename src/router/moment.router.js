const Router = require("koa-router");
const momentRouter =new Router({prefix:'/moment'})
const {verifyAuth,verifyPermission} =require('../middleware/auth.middleware')
const {create,detail,list,update} =require('../controller/moment.controller.js');
momentRouter.post('/',verifyAuth,create)
//查询多条数据
momentRouter.get('/',list)
//查询单条数据
momentRouter.get('/:momentId',detail)
//修改
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
module.exports= momentRouter