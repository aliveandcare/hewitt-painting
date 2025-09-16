const client = require('@sanity/client');

const sanityClient = client({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { name, rating, reviewText } = req.body;

    if (!name || !rating || !reviewText) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const doc = {
            _type: 'review',
            name: name,
            rating: parseInt(rating),
            reviewText: reviewText,
            createdAt: new Date().toISOString()
        };

        const result = await sanityClient.create(doc);
        res.status(200).json({ message: 'Review submitted successfully!', id: result._id });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Error submitting review.' });
    }
}