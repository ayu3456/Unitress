import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './utils/db.js';
import userRoute from './routes/user.routes.js';
import companyRoute from './routes/company.routes.js';
import jobRoute from './routes/job.routes.js';
import applicationRoute from './routes/application.routes.js';

dotenv.config({});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://job-hunt-aucsj8vl5-ayush-guptas-projects-b7c877d4.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Basic route for testing
app.get('/home', (req, res) => {
    return res.status(200).json({
        message: 'I am coming from backend',
        success: true
    });
});

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

// Error handling for unexpected routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found', success: false });
});

// Start the server
app.listen(port, () => {
    dbConnect();
    console.log(`Server is running at port ${port}`);
});









