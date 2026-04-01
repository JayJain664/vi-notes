/**
 * ============================================
 * 🚀 Backend Server Setup (Express + MongoDB)
 * ============================================
 */

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();


app.get('/',(req,res)=>{
  res.send("Hello ViNotes Backend!")
})

/**
 * ============================================
 * 🔧 Middleware Configuration
 * ============================================
 */

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (React app) to communicate with backend



app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // use env instead of hardcoding
    credentials: true, // allows cookies / auth headers
  })
);

// Parse incoming JSON requests
app.use(express.json());

/**
 * ============================================
 * 📦 Routes
 * ============================================
 */

// Auth-related routes
app.use('/api/auth', require('./routes/authRoutes'));

// Keystroke-related routes
app.use('/api/keystrokes', require('./routes/keystrokeRoutes'));

/**
 * ============================================
 * ❤️ Health Check Endpoint
 * ============================================
 * Useful for:
 * - Monitoring server status
 * - Deployment checks (Render, Vercel, etc.)
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
  });
});

/**
 * ============================================
 * 🛢️ MongoDB Connection & Server Start
 * ============================================
 */

const PORT = process.env.PORT || 5000;

// Function to connect DB and start server
const startServer = async () => {
  try {
    // Validate required env variable
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB connected successfully');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);

    // Exit process with failure
    process.exit(1);
  }
};

// Initialize server
startServer();
