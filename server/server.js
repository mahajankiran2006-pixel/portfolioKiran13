const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const admin = require('firebase-admin');

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
let db;
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
  db = admin.firestore();
  if (!isProduction) console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error.message);
}

// Contact form endpoint
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, message } = req.body;

      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const contactData = {
        name,
        email,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      };

      const docRef = await db.collection('contacts').add(contactData);

      res.status(200).json({
        success: true,
        message: 'Message sent successfully',
        id: docRef.id
      });
    } catch (error) {
      if (!isProduction) console.error('Error saving contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  }
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (!isProduction) console.log(`Server running on port ${PORT}`);
});
