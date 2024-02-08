const { Pool } = require('pg');
const pool = require('./database/connection.js');

function getArticles() {
    const sql = 'SELECT * FROM articles ORDER BY id DESC';
    const result = pg_query_params(dbconn, sql, []);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify(pg_fetch_all(result));
}

function getArticleById(id) {
    const sql = 'SELECT * FROM articles WHERE id=$1';
    const result = pg_query_params(dbconn, sql, [id]);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify(pg_fetch_object(result));
}

function getRegattas() {
    const sql = 'SELECT * FROM regatta ORDER BY id DESC';
    const result = pg_query_params(dbconn, sql, []);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify(pg_fetch_all(result));
}

function getRegattasResult(year, run) {
    const tableName = 'regatta_results_' + year + '_' + run;
    const sql = `SELECT * FROM ${tableName}`;
    const result = pg_query_params(dbconn, sql, []);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify(pg_fetch_all(result));
}

function getGalleryAlbums() {
    const sql = 'SELECT * FROM gallery_albums ORDER BY id DESC';
    const result = pg_query_params(dbconn, sql, []);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    const albums = pg_fetch_all(result);
    albums.forEach((album, index) => {
        const folderPath = album['folder_path'];
        const photos = Array.from(fs.readdirSync("../frontend/" + folderPath)).slice(2);
        albums[index]['photos'] = photos;
    });
    return JSON.stringify(albums);
}

function getGalleryAlbumById(id) {
    const sql = 'SELECT * FROM gallery_albums WHERE id=$1';
    const result = pg_query_params(dbconn, sql, [id]);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    const album = pg_fetch_assoc(result);
    if (album) {
        const folderPath = album['folder_path'];
        const photos = Array.from(fs.readdirSync("../frontend/" + folderPath)).slice(2);
        album['photos'] = photos;
    }
    return JSON.stringify(album);
}

function addCrew() {
    const postData = fs.readFileSync("php://input");
    const data = JSON.parse(postData);
    if (data === null) {
        return JSON.stringify({ error: 'Invalid JSON data' });
    }
    const vesselName = data['nazwa'];
    const vesselType = data['typ'];
    const mark = data['oznaczenie'];
    const length = data['dlugosc'];
    const captain = data['sternik'];
    const qualifications = data['stopien'];
    const dateOfBirth = data['rok'];
    const address = data['adres'];
    const phone = data['nr'];
    const club = data['klub'];
    const crewmen = data['zaloga'];
    const sql = 'INSERT INTO crew (vessel_name, vessel_type, mark, length, captain, qualifications, date_of_birth, address, phone, club, crewmen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const params = [
        vesselName,
        vesselType,
        mark,
        length,
        captain,
        qualifications,
        dateOfBirth,
        address,
        phone,
        club,
        crewmen,
    ];
    const result = pg_query_params(dbconn, sql, params);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify({ message: 'Crew data added successfully' });
}

function addArticle(title, content, photo) {
    const postData = fs.readFileSync("php://input");
    const data = JSON.parse(postData);
    if (data === null) {
        return JSON.stringify({ error: 'Invalid JSON data' });
    }
    const articleTitle = data['title'];
    const articleContent = data['text'];
    const articlePhoto = data['photo'];
    const sql = 'INSERT INTO articles (title, content, photo) VALUES ($1, $2, $3)';
    const params = [
        articleTitle,
        articleContent,
        articlePhoto,
    ];
    const result = pg_query_params(dbconn, sql, params);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify({ message: 'Article added successfully' });
}


function addGalleryAlbum(title, folderPath) {
    const postData = fs.readFileSync("php://input");
    const data = JSON.parse(postData);
    if (data === null) {
        return JSON.stringify({ error: 'Invalid JSON data' });
    }
    const albumTitle = data['title'];
    const albumFolderPath = data['path'];
    const sql = 'INSERT INTO gallery_albums (title, folder_path) VALUES ($1, $2)';
    const params = [
        albumTitle,
        albumFolderPath,
    ];
    const result = pg_query_params(dbconn, sql, params);
    if (result === false) {
        return JSON.stringify({ error: 'Database error' });
    }
    return JSON.stringify({ message: 'Gallery album added successfully' });
}



module.exports = {
    getGalleryAlbums,
    getArticles,
    getArticleById,
    addArticle,
    addGalleryAlbum,
};