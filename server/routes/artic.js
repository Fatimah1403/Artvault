import express from "express";
import axios from "axios";
const router = express.Router();

const BASE_URL = process.env.ARTIC_API_BASE_URL;
const FIELDS =
  "id,title,artist_display,artist_id,date_display,image_id,department_title,place_of_origin";
router.get('/artworks', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const response = await axios.get(
            `${BASE_URL}/artworks?fields=${FIELDS}&page=${page}&limit=${limit}`
            
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch artworks' });
    }
});
router.get('/artworks/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json({ error: 'Query required' });
      const response = await axios.get(
        `${BASE_URL}/artworks/search?q=${q}&fields=${FIELDS}&limit=20`
      );
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Search failed' });
    }
  });
  router.get('/artworks/:id', async (req, res) => {
    try {
      const fields = 'id,title,artist_display,artist_id,date_display,medium_display,dimensions,image_id,department_title,description,place_of_origin';
      const response = await axios.get(
        `${BASE_URL}/artworks/${req.params.id}?fields=${fields}`
      );
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Artwork not found' });
    }
  });
router.get('/artists/:id', async (req, res) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/agents/${req.params.id}?fields=id,title,description,birth_date,death_date,place_of_birth`
      );
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Artist not found' });
    }
});
  
  router.get('/departments', async (req, res) => {
    try {
      const response = await axios.get(`${BASE_URL}/departments`);
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
});




export default router;