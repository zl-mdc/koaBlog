const connection=require('../app/database')

class UserService{
    async create(user){
        //讲user存储到数据库
        console.log(user);
        const {username,password} = user
        const statement  = `INSERT INTO users (name,password) VALUES (?, ?);`;
         
        const result=await connection.execute(statement,[username,password])

        return result
    }

    async getUserByName(name){
        const statement = `SELECT * FROM users where name = ?;`
        const result  = await connection.execute(statement,[name])

        //result返回的是一个数组，数组[0]是需要的信息，后面是一些字段
        return result[0]

    }
}
module.exports=new UserService()