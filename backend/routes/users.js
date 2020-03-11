const express = require('express');
const User = require('../models/users');
const Admin = require('../models/admin');
const multer = require('multer');
var fs = require('fs');

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
router.post('/', upload.single('image'), async function (request, response, next) {
    var body = request.body;
    var file = request.file.filename;
    let user = {
        typeId : body.typeId,
        login : body.login,
        password: await User.hashofPassword(body.password),
        fullName :  body.fullName,
        image: file,
        firstBalance :  body.firstBalance,
        leftHand : body.leftHand,
        rightHand : body.rightHand,
        whoAdd : body.whoAdd,
        whoBottom : body.whoBottom,
        addUsers : body.addUsers,
        ballOfBinar : body.ballOfBinar,
        ballOfInvite : body.ballOfInvite,
        ballOfCheck : body.ballOfCheck,
        ballOfWeek : body.ballOfWeek,
        ballOfMonth : body.ballOfMonth,
        date: new Date().toISOString().
                          replace(/T/, ' ').
                          replace(/\..+/, '')
    }
    const use = new User(user);
        let token = await User.generateToken(use.login, use.password);
    console.log(use);
    use.save().then( (res) =>{
        response.status(200).json({token: token})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved user"})
    })
});


router.get('/', (request, response, next) =>{
    var users = [];
    User.find().then( (all) =>{
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

    await User.findById(id).then( (res)=>{
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
            await User.findById(id).then( (res) =>{
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

                await User.findByIdAndRemove(id).catch( err => {
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
// status ni o'zgartirish

router.patch('/:id', async function(request, response) {
    var id = request.params.id;
    let body = {};
    User.findById(id).then(res => {
      var image= res.image;
      fs.unlink('backend/images/' + image, function (err) {
          if (err) {
          console.log(err.message);}
          else {
              console.log('File deleted!');
          }
      });

        body = res;
        body.status = true;
        User.findByIdAndUpdate(id, { $set: body }, { new: true }).then(res => {
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


router.patch('/updateUser/:id/:token', multer({ storage: storage }).single('image'), async function(request, response, next) {
  var id = request.params.id;
  var token = request.params.token;
  var admin = await User.find();
  var obj = User.verifyOfUser(admin, token);
  if (obj.isUser) {
    await User.findById(id).then( (res) =>{
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
      await User.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
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


router.get('/verifyUser/:token', async function(request, response) {
     var token = request.params.token;
        var users = await User.find();

    var obj = User.verifyOfUser(users, token);
    response.status(200).json(obj);

})
 //                                                                K i r  i  sh

router.post('/sign', async function(request, response) {
    var body = request.body;
    var data = {}
    var users = await User.find();
    var obj = User.verifyUser(users, body);

    if(obj.isUser) {
        data.token = obj.token;
        data.isUser = obj.isUser;
        response.status(200).json(data)
    }
    else {
        response.status(404).json({message: "User Not found!"})
    }
});




module.exports = router
