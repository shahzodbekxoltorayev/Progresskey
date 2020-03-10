const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    nameUz: {type: String},
    nameRu: {type: String},
    nameEn: {type: String},
    descriptionUz: {type: String},
    descriptionRu: {type: String},
    descriptionEn: {type: String},
    image : {type: String},
    rating: {type: Number},
    date: {type: String}
});

module.exports = mongoose.model('news', newsSchema);
