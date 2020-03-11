const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nameUz: {type: String},
    nameRu: {type: String},
    nameEn: {type: String},
    descriptionUz: {type: String},
    descriptionRu: {type: String},
    descriptionEn: {type: String},
    image : {type: String},
    categoryId: {type: String},
    wareHouseId: {type: String},
    quantity: {type: Number},  //miqdori
    configuration: {type: String},
    price: {type: Number},
    rating: {type: Number},
    date: {type: String}
});

module.exports = mongoose.model('products', productSchema);
