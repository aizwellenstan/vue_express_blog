module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/blog_db', {
        useNewUrlParser: true
    }).then(()=>{
        console.log('db connected')
    }).catch((err)=>{
        console.log(err)
    })
}