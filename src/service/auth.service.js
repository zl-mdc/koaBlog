const connection=require('../app/database')

class AuthService{
    async checkMoment(momentId,userId){
        return true
    }
}
module.exports = new AuthService()