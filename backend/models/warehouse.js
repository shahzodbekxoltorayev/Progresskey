const mongoose = require('mongoose');

const wareHouseSchema = mongoose.Schema({
    nameUz: {type: String},    
    nameRu: {type: String},    
    nameEn: {type: String},
    products : {type: Array}    
});

 
module.exports = mongoose.model('wareHouse', wareHouseSchema);