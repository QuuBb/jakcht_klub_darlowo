const express = require('express');
const bodyParser = require('body-parser');
const { getArticles, getArticleById, getRegattas, getRegattasResult, getGalleryAlbums, getGalleryAlbumById, addCrew, addArticle, addGalleryAlbum } = require('./REST');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Endpoint for GET requests
app.get('/backend/:resource', (req, res) => {
  const { resource } = req.params;
  switch (resource) {
    case 'articles':
      return res.json(getArticles());
    case 'article':
      const id = req.query.id;
      return getArticleById(req, res, id);
    case 'regattas':
      return res.json(getRegattas());
    case 'regatta-results':
      const year = req.query.year;
      const run = req.query.run;
      return res.json(getRegattasResult(year, run));
    case 'gallery-albums':
      return res.json(getGalleryAlbums());
    case 'gallery-album':
      const albumId = req.query.id;
      return res.json(getGalleryAlbumById(albumId));
    default:
      return res.status(404).json({ error: 'Not Found' });
  }
});

// Endpoint for POST requests
app.post('/backend/:resource', (req, res) => {
  const { resource } = req.params;
  switch (resource) {
    case 'crew':
      const crewData = req.body;
      return res.json(addCrew(crewData));
    case 'add_article':
      const articleData = req.body;
      return res.json(addArticle(articleData.title, articleData.text, articleData.photo));
    case 'add_gallery_album':
      const galleryAlbumData = req.body;
      return res.json(addGalleryAlbum(galleryAlbumData.title, galleryAlbumData.path));
    default:
      return res.status(404).json({ error: 'Not Found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
