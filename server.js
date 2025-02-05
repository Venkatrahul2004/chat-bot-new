import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';

// Load environment variables
dotenv.config();

// Environment variables validation
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error('Error: API_KEY is required but not set in environment variables');
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));

// Request validation middleware
const validateChatRequest = (req, res, next) => {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ 
            error: 'Invalid request: messages array is required' 
        });
    }

    next();
};

// Chat endpoint
app.post('/api/chat', validateChatRequest, async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                `Groq API error: ${response.status} - ${
                    errorData?.error?.message || 'Unknown error'
                }`
            );
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
        
        // Send appropriate error response based on error type
        if (error.message.includes('Groq API error')) {
            res.status(502).json({ 
                error: 'Error communicating with Groq API',
                details: error.message 
            });
        } else {
            res.status(500).json({ 
                error: 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});