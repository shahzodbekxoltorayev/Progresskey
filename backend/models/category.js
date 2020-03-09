const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    nameUz: {type: String},    
    nameRu: {type: String},    
    nameEn: {type: String}    
});

 
module.exports = mongoose.model('category', categorySchema);