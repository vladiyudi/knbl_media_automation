const express = require('express');
const router = express.Router();
const { generateFluxLora } = require('../controlers/fluxLora');
const { generateImage } = require('../controlers/imageGeneration');
const { upscaleImage } = require('../controlers/imageUpscale');

router.get('/hello', (req, res) => {
    res.json({ 
        message: 'Hello from the server!',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        uptime: process.uptime()
    });
});

router.post('/generateImage', generateImage);

router.post('/upscaleImage', upscaleImage);

router.post('/generateFluxLora', generateFluxLora);

module.exports = router;
