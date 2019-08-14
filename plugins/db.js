module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db', {
        useNewUrlParser: true
    }).then(()=>{
        console.log('db connected')
    }).catch((err)=>{
        console.log(err)
    })
}
