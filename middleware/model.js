module.exports = option =>{
    return async (req, res, next)=> {
        const modelName = require('inflection').classify(req.params.model)
        req.Model = require(`../models/${modelName}`)
        await next()
    }
}