const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'database',
    user: 'postgres',
    password: '123456',
});

const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getArticleById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM articles WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getRegattas = (request, response) => {
    pool.query('SELECT * FROM regatta ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getGalleryAlbums = (request, response) => {
    pool.query('SELECT * FROM gallery_albums ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getGalleryAlbumById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM gallery_albums WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addCrew = (request, response) => {
    const {nazwa, typ, oznaczenie, dlugosc, sternik, stopien, rok, adres, nr, klub, zaloga} = request.body;

    pool.query(
        'INSERT INTO crew (vessel_name, vessel_type, mark, length, captain, qualifications, date_of_birth, address, phone, club, crewmen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [nazwa, typ, oznaczenie, dlugosc, sternik, stopien, rok, adres, nr, klub, zaloga],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`Crew added with ID: ${results.rows[0].id}`);
        }
    );
};

const addArticle = (request, response) => {
    const {title, text, photo} = request.body;

    pool.query('INSERT INTO articles (title, content, photo) VALUES ($1, $2, $3)', [title, text, photo], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Crew added with ID: ${results.rows[0].id}`);
    });
};

const addGalleryAlbum = (request, response) => {
    const {title, path} = request.body;

    pool.query('INSERT INTO gallery_albums (title, folder_path) VALUES ($1, $2)', [title, path], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Crew added with ID: ${results.rows[0].id}`);
    });
};

module.exports = {
    getArticles,
    getArticleById,
    getGalleryAlbums,
    getGalleryAlbumById,
    addCrew,
    addArticle,
    addGalleryAlbum,
};
