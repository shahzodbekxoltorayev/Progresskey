const express = require('express');
const User = require('../models/users');
const Registrar = require('../models/registrar');
const Admin = require('../models/admin');
// const jwt = require('jsonwebtoken');

const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/', async function (request, response, next) {
   var body = request.body;
 
    let registrar = {
        filialId : body.filialId,
        login : body.login,
        password: await Registrar.hashofPassword(body.password),
        registerUserId :  body.registerUserId,
        fullName :  body.fullName,
        generalBalance : body.generalBalance,
        warehouseId : body.warehouseId, 
        date: new Date().toISOString().
                          replace(/T/, ' ').
                          replace(/\..+/, '')
    }
    const reg = new Registrar(registrar);
        let token = await Registrar.generateToken(reg.login, reg.password);
        reg.save().then( (res) =>{
        response.status(200).json({token: token})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved user"})
    })
});


router.get('/', (request, response, next) =>{
    var users = [];
    Registrar.find().then( (all) =>{
        for (let i=all.length-1; i>=0; i--) {
            users.push(all[i]);
        }
        response.status(200).json(users);
    }).catch(  (err)=>{
        console.log(err)
        response.status(400).json({message: "Error in Get All Users"});

    })
});


router.get('/:id', async function(request, response) {
    var data = {};
    var id = request.params.id;

    await Registrar.findById(id).then( (res)=>{
            if(!res) {
                success = false;
                data = "User not found"
                response.status(400).json(data);
            }
            else {
                data = res;
                response.status(200).json(data);
            }
        })
        .catch( (err) =>{
            console.log(err);
            response.status(400).json()
        });
});


router.delete('/:id/:token', async function (request, response, next ){
    var data = {};
    var id = request.params.id;
    var token = request.params.token;
    var users = await Admin.find();
    var success = false;
    var obj = Admin.verifyOfAdmin(users, token);

    if (obj.isAdmin) {
        success = true
            await Registrar.findById(id).then( (res) =>{
                if(res) {
                    return res
                }
                else {
                    success = false
                    data.message = "This User not found";
                    return null;
                }
            }).catch( err =>{
                success = false
                response.status(400).json({message: "User not found"});
            })

                await Registrar.findByIdAndRemove(id).catch( err => {
                    success = false;
                })
                if(success) {
                    response.status(200).json({message: "User deleted"})
                }
                else {
                    response.status(400).json({message: "Error in Delete User"})
                }
            }

    else {
        response.status(400).json(data)
    }
})

router.patch('/:id', async function(request, response) {
    var id = request.params.id;
    let body = {};
    Registrar.findById(id).then(res => {
        body = res;
        body.status = true;
        Registrar.findByIdAndUpdate(id, { $set: body }, { new: true }).then(res => {
            if (res) {
                response.status(200).json({ message: "Status: True" })
            } else {
                response.status(400).json({ message: "Error in status" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json(err);
        })
    })
})


router.get('/verifyUser/:token', async function(request, response) {
     var token = request.params.token;
        var users = await Registrar.find();

    var obj = Registrar.verifyOfUser(users, token);
    response.status(200).json(obj);

})
 //                                                                K i r  i  sh

router.post('/sign', async function(request, response) {
    var body = request.body;
    var data = {}
    var users = await Registrar.find();
    var obj = Registrar.verifyUser(users, body);

    if(obj.isRegistrar) {
        data.token = obj.token;
        data.isRegistrar = obj.isRegistrar;
        response.status(200).json(data)
    }
    else {
        response.status(404).json({message: "User Not found!"})
    }
});

module.exports = router
