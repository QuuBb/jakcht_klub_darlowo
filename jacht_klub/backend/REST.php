<?php
include_once('database/connection.php');

function getArticles()
{
    $sql = 'SELECT * FROM articles ORDER BY id DESC';
    $result = pg_query_params($GLOBALS['dbconn'], $sql, []);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(pg_fetch_all($result));
}

function getArticleById($id)
{
    $sql = 'SELECT * FROM articles WHERE id=$1';
    $result = pg_query_params($GLOBALS['dbconn'], $sql, [$id]);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(pg_fetch_object($result));
}

function getRegattas()
{
    $sql = 'SELECT * FROM regatta ORDER BY id DESC';
    $result = pg_query_params($GLOBALS['dbconn'], $sql, []);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(pg_fetch_all($result));
}

function getRegattasResult($year, $run)
{
    $tableName = 'regatta_results_' . $year . '_' . $run;
    $sql = "SELECT * FROM $tableName";
    $result = pg_query_params($GLOBALS['dbconn'], $sql, []);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(pg_fetch_all($result));
}

function getGalleryAlbums()
{
    $sql = 'SELECT * FROM gallery_albums ORDER BY id DESC';
    $result = pg_query_params($GLOBALS['dbconn'], $sql, []);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    $albums = pg_fetch_all($result);

    foreach ($albums as $index => $album) {
        $folderPath = $album['folder_path'];
        $photos = array_slice(scandir("../frontend/" . $folderPath), 2);
        $albums[$index]['photos'] = $photos;
    }

    return json_encode($albums);
}

function getGalleryAlbumById($id)
{
    $sql = 'SELECT * FROM gallery_albums WHERE id=$1';
    $result = pg_query_params($GLOBALS['dbconn'], $sql, [$id]);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    $album = pg_fetch_assoc($result);

    if ($album) {
        $folderPath = $album['folder_path'];
        $photos = array_slice(scandir("../frontend/" . $folderPath), 2);
        $album['photos'] = $photos;
    }

    return json_encode($album);
}

function addCrew()
{
    // Get the raw POST data
    $postData = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($postData, true);

    // Check if JSON decoding was successful
    if ($data === null) {
        // Handle invalid JSON
        return json_encode(['error' => 'Invalid JSON data']);
    }

    // Extract parameters from the decoded JSON
    $vesselName = $data['nazwa'];
    $vesselType = $data['typ'];
    $mark = $data['oznaczenie'];
    $length = $data['dlugosc'];
    $captain = $data['sternik'];
    $qualifications = $data['stopien'];
    $dateOfBirth = $data['rok'];
    $address = $data['adres'];
    $phone = $data['nr'];
    $club = $data['klub'];
    $crewmen = $data['zaloga'];

    // Your SQL query
    $sql = 'INSERT INTO crew 
            (vessel_name, vessel_type, mark, length, captain, qualifications, date_of_birth, address, phone, club, crewmen) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

    // Bind parameters
    $params = [
        $vesselName,
        $vesselType,
        $mark,
        $length,
        $captain,
        $qualifications,
        $dateOfBirth,
        $address,
        $phone,
        $club,
        $crewmen,
    ];

    // Execute the query
    $result = pg_query_params($GLOBALS['dbconn'], $sql, $params);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(['message' => 'Crew data added successfully']);
}

function addArticle($title, $content, $photo)
{
    $sql = 'INSERT INTO articles 
            (title, content, photo) 
            VALUES 
            ($1, $2, $3)';

    $params = [
        $title,
        $content,
        $photo,
    ];

    $result = pg_query_params($GLOBALS['dbconn'], $sql, $params);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(['message' => 'Article added successfully']);
}

function addGalleryAlbum($title, $folderPath)
{
    $sql = 'INSERT INTO gallery_albums 
            (title, folder_path) 
            VALUES 
            ($1, $2)';

    $params = [
        $title,
        $folderPath,
    ];

    $result = pg_query_params($GLOBALS['dbconn'], $sql, $params);

    if ($result === false) {
        // Handle database query error
        return json_encode(['error' => 'Database error']);
    }

    return json_encode(['message' => 'Gallery album added successfully']);
}