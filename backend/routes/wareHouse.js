const express = require('express');
const Warehouse = require('../models/warehouse');
const Admin = require('../models/admin');

const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/:token', async function (request, response, next) {
   var body = request.body;
    var token = request.params.token;
    var admins = await  Admin.find();
    // console.log(body);
    var obj = await Admin.verifyOfAdmin(admins, token);

    let wareHouse = {
        nameUz : body.nameUz,
        nameRu : body.nameRu,
        nameEn : body.nameEn,
        products : body.products
    }
    const ware = new Warehouse(wareHouse);

    if(obj.isAdmin) {
        ware.save().then( (res) =>{
        response.status(200).json({message: "New ware saved"})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved ware"})
    })
}
else {
    response.status(404).json({message: "This is not Moderator"})
}
});

router.get('/getall', async(request, response, next) => {
    let warehouse = await Warehouse.find();
    response.status(200).json(warehouse)
})

router.get('/:id', async function(request, response, next) {
    var id = request.params.id;
      await Warehouse.findById(id).then((res) => {
        if (!res) {
            response.status(400).json({ message: "WareHouse Not found" });
        } else {
            response.status(200).json(res);
        }
    }).catch((err) => {
        console.log(err);
        response.status(400).json({ message: "WareHouse Not found" });
    })
})

router.delete('/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isAdmin) {
            await Warehouse.findByIdAndDelete(id).then((res) => {
                response.status(200).json({ message: "WareHouse deleted!" });
            })
            .catch((err) => {
                console.log(err);
                response.status(400).json({ message: "Error in delete WareHouse" });
            })
    } else {
        console.log(obj)
        response.status(400).json({ message: "This is not Admin" });
    }

})

router.patch('/:id/:token' , async function(request, response, next) {
    var id = request.params.id;
    var body = request.body;

    // body.logo = request.file.filename;

    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isAdmin) {
        await Warehouse.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
            if (res) {
                response.status(200).json({ message: "WareHouse Update Successfully" });
            } else {
                response.status(400).json({ message: "Error in Update WareHouse" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json({ message: "This is Not Admin" });
        })
    }
})
 

module.exports = router;

