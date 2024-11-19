const {imageGeneration} = require('../models/falAigen')

async function generateImage(req, res) {
    const prompt = req.body.prompt
    const size = req.body.size
    const result = await imageGeneration(prompt, size)
    res.status(200).json({
        message: "success",
        result: result.data
    })
}

module.exports = {
    generateImage
}