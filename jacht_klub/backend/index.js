const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rest = require('./REST');
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'});
});

app.get('/backend/articles', rest.getArticles);
app.get('/backend/article/:id', rest.getArticleById);
app.get('/backend/gallery-albums', rest.getGalleryAlbums);
app.get('/backend/gallery-album/:id', rest.getGalleryAlbumById);
app.post('/crew', rest.addCrew);
app.post('/add_article', rest.addArticle);
app.post('/add_gallery_album', rest.addGalleryAlbum);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
