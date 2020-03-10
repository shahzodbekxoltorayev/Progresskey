const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema({
    nameUz: {type: String},    
    nameRu: {type: String},    
    nameEn: {type: String}    
});
 
module.exports = mongoose.model('userType', userTypeSchema);