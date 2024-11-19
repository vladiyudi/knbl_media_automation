require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api';

// Set server timeout
app.set('timeout', 60000); // 60 seconds
app.use((req, res, next) => {
    res.setTimeout(60000, () => {
        res.status(408).send('Request has timed out');
    });
    next();
});

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging - only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 50 : 100
});
app.use(limiter);

// Routes
app.use(apiPrefix, apiRoutes);

// Root route for Vercel health checks
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        environment: process.env.NODE_ENV
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Error handling
app.use(errorHandler);

// Export for Vercel
module.exports = app;

// Start server if not running in Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`);
        console.log(`API endpoints available at http://localhost:${port}${apiPrefix}`);
    });
}
