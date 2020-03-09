const express = require('express');
const UserType = require('../models/userType');
const Registrar = require('../models/registrar');

const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/:token', async function (request, response, next) {
   var body = request.body;
    var token = request.params.token;
    var admins = await  Registrar.find();
    console.log(body);
    var obj = await Registrar.verifyOfUser(admins, token);

    let type = {
        nameUz : body.nameUz,
        nameRu : body.nameRu,
        nameEn : body.nameEn
    }
    const user = new UserType(type);

    if(obj.isRegistrar) {
    user.save().then( (res) =>{
        response.status(200).json({message: "New Type saved"})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved type"})
    })
}
else {
    response.status(404).json({message: "This is not Registrar"})

}
});

router.get('/getall', async(request, response, next) => {
    let types = await Registrar.find();
    response.status(200).json(types)
})

router.get('/getType/:id', async function(request, response, next) {
    var id = request.params.id;
      await Registrar.findById(id).then((res) => {
        if (!res) {
            response.status(400).json({ message: "Category Not found" });
        } else {
            response.status(200).json(res);
        }
    }).catch((err) => {
        console.log(err);
        response.status(400).json({ message: "Category Not found" });
    })
})

router.delete('/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Registrar.find();

    var obj = Registrar.verifyOfUser(admin, token);
    if (obj.isModerator) {
            await Registrar.findByIdAndDelete(id).then((res) => {
                response.status(200).json({ message: "Category deleted!" });
            })
            .catch((err) => {
                console.log(err);
                response.status(400).json({ message: "Error in delete Category" });
            })
    } else {
        console.log(obj)
        response.status(400).json({ message: "This is not Moderator" });
    }

})

router.patch('/updateCategory/:id/:token' , async function(request, response, next) {
    var id = request.params.id;
    var body = request.body;

    // body.logo = request.file.filename;

    var token = request.params.token;
    var admin = await Registrar.find();

    var obj = Registrar.verifyOfUser(admin, token);
    if (obj.isModerator) {
        await Registrar.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
            if (res) {
                response.status(200).json({ message: "Category Update Successfully" });
            } else {
                response.status(400).json({ message: "Error in Update Category" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json({ message: "This is Not Moderator" });
        })
    }
}) 


module.exports = router;

