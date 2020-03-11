const express = require('express');
const multer = require('multer');
const User = require('../models/users');
const Registrar = require('../models/registrar');
const Admin = require('../models/admin');
// const jwt = require('jsonwebtoken');
const router = express.Router();


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
}

const url = 'http://localhost:5000';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Errorrr");
      if (isValid) {
          error = null;
      }
      cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  }
})
const upload = multer({ storage: storage })


 //                                                               R e g i  s t r a t s i o n
router.post('/:token',  upload.single('image'), async function (request, response, next) {
   var body = request.body;
    var file = request.file.filename;
    var token = req.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);

    let registrar = {
        filialId : body.filialId,
        login : body.login,
        image: file,
        password: await Registrar.hashofPassword(body.password),
        registerUserId :  body.registerUserId,
        fullName :  body.fullName,
        generalBalance : body.generalBalance,
        warehouseId : body.warehouseId,
        date: new Date().toISOString().
                          replace(/T/, ' ').
                          replace(/\..+/, '')
    }
    if (obj.isAdmin) {

    const reg = new Registrar(registrar);
        let token = await Registrar.generateToken(reg.login, reg.password);
        reg.save().then( (res) =>{
        response.status(200).json({token: token})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved user"})
    })
  } else {
    response.status(404).json({message: "Not admin"})

  }

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
                  var image= res.image;
                  fs.unlink('backend/images/' + image, function (err) {
                      if (err) {
                      console.log(err.message);}
                      else {
                          console.log('File deleted!');
                      }
                  });
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


router.patch('/updateRegistrar/:id/:token', multer({ storage: storage }).single('image'), async function(request, response, next) {
  var id = request.params.id;
  var token = request.params.token;
  var admin = await Registrar.find();
  var obj = Registrar.verifyOfUser(admin, token);
  if (obj.isRegistrar) {
    await Registrar.findById(id).then( (res) =>{
      var image= res.image;
       fs.unlink('backend/images/' + image, function (err) {
           if (err) {
           console.log(err.message);}
           else {
               console.log('File deleted!');
           }
       });
   });
  var body = request.body;
  body.image = request.file.filename;
      await Registrar.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
          if (res) {
              response.status(200).json(true);
          } else {
              response.status(400).json(false)
          }
      }).catch(err => {
          console.log(err);
          response.status(400).json(false);
      })
  }
  else {
    response.status(400).json(false);
  }
})

router.get('/verifyRegistrar/:token', async function(request, response) {
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
