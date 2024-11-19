const {imageUpscale} = require('../models/falAigen')

async function upscaleImage(req, res) {
    const image_url = req.body.image_url
    const result = await imageUpscale(image_url)
    
    res.status(200).json({
        message: "success",
        result: result.image.url
    })
}

module.exports = {
    upscaleImage
}