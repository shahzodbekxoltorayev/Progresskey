const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const registrarSchema = mongoose.Schema({
    filialId: {type: String},
    login: {type: String},
    password: {type: String},
    registerUserId: {type:  Array},
    fullName: {type: String},
    generalBalance: {type: Number}, 
    warehouseId: {type: String},
    date: {type: String}
});

registrarSchema.statics.hashofPassword = function(pass) {
    let password = {password: pass};
    let hashpass = jwt.sign(password, 'pro');
    return hashpass;
}

registrarSchema.statics.generateToken = function(login, password) {
    var value = {
        login: login,
        password: password
    }

    var token = jwt.sign(value, 'pro');
    return token;
}

//                                                               K i r i  sh

registrarSchema.statics.verifyUser = function(users, body) {
    var object = {isRegistrar : false};
    var distoken = undefined;

    users.forEach((user) => {
        try{
            distoken = jwt.verify(user.password, 'pro');
        console.log(distoken);
        }
        catch {
        }
        if (distoken) {
            if(user.login == body.login && distoken.password == body.password ) {
                    object.isRegistrar = true;
                    object.token = jwt.sign({login: user.login, password: user.password}, 'pro')
            }
        }
        else {
            console.log("Distoken Undefined")
        }
    })
    return object;
}



//                                                      T e k s  h i r i  s h

registrarSchema.statics.verifyOfUser = function(users, token) {
    var object = {isRegistrar : false,  userId: undefined};
    var distoken = undefined;
    users.forEach((user) => {
        try{
            distoken = jwt.verify(token, 'pro');
        }
        catch {

        }
        if (distoken) {
            if(user.login == distoken.login && user.password == distoken.password ) {
                    object.isRegistrar = true;
                    object.token = jwt.sign({login: user.login, password: user.password}, 'pro');
                    object.userId = user._id;
                    object.userName = user.login;

            }
        }
        else {
            console.log("Distoken Undefined")
        }
    })

    return object;
}



module.exports = mongoose.model('registrar', registrarSchema);
