const passport = require('passport');
const passportJwt = require('passport-jwt');
const {Strategy, ExtractJwt} = passportJwt;
const mysql = require('mysql');
 
module.exports = app =>{
    const params={
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, (payload,done) =>{
        let sqlQry = `SELECT * FROM afinal.professor WHERE email = '${payload.id}';`;
        const connection = mysql.createConnection({
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            database : 'afinal' 
        });
        connection.query(sqlQry,[values],function(error, results, fields){
            if(error) 
                console.log(error);
            else
                console.log(results);
            connection.end();
            if(results.length==0){
                return error;
            }else{
                return {...payload};
            }
        }); 
    })
    passport.use(strategy)
    return{
        authenticate: () => passport.authenticate('jwt',{ session:false })
    }
}