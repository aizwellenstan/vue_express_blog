module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    // Import modelMiddleware
    const modelMiddleware = require('../middleware/model')
    // Import authMiddleware
    const authMiddleware = require('../middleware/auth')
    // Add
    router.post('/', async (req, res) => {
        if(req.Model.modelName === 'Article'){
            req.body.author = req.user._id
        }
        const model = await req.Model.create(req.body) //req.body，app need to use middleware xpress.json
        res.send(model)
    })
    // Search
    router.get('/:id', async (req, res) => {
        const queryOption = {}
        if (req.Model.modelName === 'Article') {
            queryOption.populate = 'author'
        }
        const data = await req.Model.findOne({
            "_id": req.params.id
        }).setOptions(queryOption)
        res.send(data)
    })
    router.get('/', async (req, res) => {
        let data = ''
        if (req.Model.modelName === "Article") {
            data = await req.Model.find().populate('author').limit(10)

            data.map(article => {
                article.body = article.body.replace(/<[^>]+>/g, "").substr(0,100);
                return article
            })
        } else {
            data = await req.Model.find().limit(10)
        }
        res.send(data)
    })

    // Destory
    router.delete('/:id', async (req, res) => {
        const data = await req.Model.findByIdAndDelete(req.params.id)
        res.send(data)
    })

    // Edit
    router.put('/:id', async (req, res) => {
        const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(data)
    })
    app.use('/blog/api/rest/:model',authMiddleware(), modelMiddleware(), router)
}
