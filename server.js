import express from 'express';
import { translate }from '@vitalets/google-translate-api';

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// POST route to handle translation requests
app.post('/translate', async (req, res) => {
    const { text, to_language } = req.body;

    if (!text || !to_language) {
        return res.status(400).json({ error: 'Missing text or target language in the request body.' });
    }

    try {
        // Translate the text
        const result = await translate(text, { to: to_language });

        // Send the translated text as a JSON response
        res.json({ translatedText: result.text });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Failed to translate text.' });
    }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});