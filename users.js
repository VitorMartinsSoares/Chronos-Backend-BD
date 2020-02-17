const bcrypt = require('bcrypt')
module.exports = app =>{
    const {existsOrError, notExistsOr, equalsOrError} = app.api.validation
    const encryptPassord = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req,res) =>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id
        try{
            existsOrError(user.name, 'nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não Informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha Invalida')
            existsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
            
        }catch(msg){
            return res.status(400).send(msg)
        }
        user.password = encryptPassord()
        delete user.confirmPassword
    }
    return {save}
}