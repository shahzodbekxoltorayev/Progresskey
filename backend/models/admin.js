const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    login: {type: String},
    password: {type: String},
    warehouseId: {type: String}
});

adminSchema.statics.hashofPassword = function(pass) {
    let password = {password: pass};
    let hashpass = jwt.sign(password, 'pro');
    return hashpass;
}

adminSchema.statics.generateToken = function(login, password) {
    var value = {
        login: login,
        password: password
    }
    var token = jwt.sign(value, 'pro');
    return token;
}
 

adminSchema.statics.verifyOfAdmin = function(admins, token) {
    var object = {isAdmin : false, adminId: undefined};
    var distoken = undefined;

    admins.forEach((admin) => {
        try{
            distoken = jwt.verify(token, 'pro');
        }
        catch {

        }
        if (distoken) {
            if(admin.login == distoken.login && admin.password == distoken.password ) {
                    object.token = jwt.sign({login: admin.login, password: admin.password}, 'pro');
                    object.adminId = admin._id;
                    object.adminName = admin.login;
                    if(admin == admins[0]){
                        object.isAdmin = true;
                    }
            }
        }
        else {
            console.log("Distoken Undefined")
        }
    })

    return object;
}



module.exports = mongoose.model('admin', adminSchema);
