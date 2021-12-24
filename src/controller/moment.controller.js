const momentService = require('../service/moment.service')

class MomentController{
    async create(ctx,next){
        let userId = ctx.user.id
        let content =ctx.request.body.content
        const result =await momentService.create(userId,content)
        ctx.body=result
        await next()
    }
    async detail(ctx,next){
        const momentId=ctx.params.momentId

        //2.根据id去查询这条数据
        const result =await momentService.getMomentById(momentId)
        ctx.body=result
        await next()
    }
    async list(ctx,next){
        //1.获取数据
        const {offset,size} = ctx.query
        //查询列表
        const result =await momentService.getMomentList(offset,size)
        ctx.body=result
    }
    async update(ctx,next){
        const {momentId} = ctx.params;
        const content = ctx.request.content
        ctx.body="修改内容"
    }
}
module.exports=new MomentController()