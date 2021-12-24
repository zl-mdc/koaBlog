const mysql = require('mysql2');
// MYSQL_HOST,
// MYSQL_PORT,
// MYSQL_DATABASE,
// MYSQL_USER,
// MYSQL_PASS
const config = require('./config'); 
const connections= mysql.createPool({
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
})

//检测是否连接成功
connections.getConnection((err,connection)=>{
    connection.connect((err)=>{
        if(err){
            console.log("连接失败",err);
        }else{
            console.log("数据库连接成功");
        }
    })
})

module.exports=connections.promise()