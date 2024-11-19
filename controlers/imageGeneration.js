const {imageGeneration} = require('../models/falAigen')

async function generateImage(req, res) {
    const prompt = req.body.prompt
    const size = req.body.size
    let model = req.body.model
    const result = await imageGeneration(prompt, size, model="flux-pro/new")
   
    res.status(200).json({
        message: "success",
        result: result.images[0].url
    })
}

module.exports = {
    generateImage
}