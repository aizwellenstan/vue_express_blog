const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {type: String},
    body: {type: String},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    
},{
    timestamps:true
})
module.exports = mongoose.model('Article', schema)