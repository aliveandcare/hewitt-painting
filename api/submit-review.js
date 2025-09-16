
import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, 
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, 
  useCdn: false, 
  apiVersion: '2024-03-11',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, rating, reviewText } = req.body;

    const doc = {
      _type: 'review',
      name,
      rating: Number(rating),
      reviewText,
    };

    await client.create(doc);
    
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
}