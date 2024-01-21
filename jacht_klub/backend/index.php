<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// If the request is an OPTIONS request, return only the headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header("Content-Length: 0");
    exit();
}
include_once('REST.php');

// Get the requested URI
$requestUri = $_SERVER['REQUEST_URI'];

// Extract the last segment after the last slash
$segments = explode('/', rtrim($requestUri, '/'));
$lastSegment = end($segments);

if (str_contains($lastSegment, '?')) {
    $lastSegment = substr($lastSegment, 0, strpos($lastSegment, '?'));
}

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Routing logic
switch ($method) {
    case 'GET':
        switch ($lastSegment) {
            case 'articles':
                echo getArticles();
                break;
            case 'article':
                $id = isset($_GET['id']) ? $_GET['id'] : null;
                echo getArticleById($id);
                break;
            case 'regattas':
                echo getRegattas();
                break;
            case 'regatta-results':
                $year = isset($_GET['year']) ? $_GET['year'] : null;
                $run = isset($_GET['run']) ? $_GET['run'] : null;
                echo getRegattasResult($year, $run);
                break;
            case 'gallery-albums':
                echo getGalleryAlbums();
                break;
            case 'gallery-album':
                $id = isset($_GET['id']) ? $_GET['id'] : null;
                echo getGalleryAlbumById($id);
                break;
            case 'error':
                pg_last_error($GLOBALS['dbconn']);
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Not Found']);
        }
        break;
    case 'POST':
        var_dump($_POST);

        switch ($lastSegment) {
            case 'crew':
                var_dump('addCrew function called');

                // Extract data from the POST request
                $vesselName = isset($_POST['vessel_name']) ? $_POST['vessel_name'] : null;
                $vesselType = isset($_POST['vessel_type']) ? $_POST['vessel_type'] : null;
                $mark = isset($_POST['mark']) ? $_POST['mark'] : null;
                $length = isset($_POST['length']) ? $_POST['length'] : null;
                $captain = isset($_POST['captain']) ? $_POST['captain'] : null;
                $qualifications = isset($_POST['qualifications']) ? $_POST['qualifications'] : null;
                $dateOfBirth = isset($_POST['date_of_birth']) ? $_POST['date_of_birth'] : null;
                $address = isset($_POST['address']) ? $_POST['address'] : null;
                $phone = isset($_POST['phone']) ? $_POST['phone'] : null;
                $club = isset($_POST['club']) ? $_POST['club'] : null;
                $crewmen = isset($_POST['crewmen']) ? $_POST['crewmen'] : null;

                // Call the function to add crew data
                echo addCrew($vesselName, $vesselType, $mark, $length, $captain, $qualifications, $dateOfBirth, $address, $phone, $club, $crewmen);
                break;
            case 'add_article':
                var_dump('addArticle function called');

                // Extract data from the POST request
                $title = isset($_POST['title']) ? $_POST['title'] : null;
                $content = isset($_POST['content']) ? $_POST['content'] : null;
                $photo = isset($_POST['photo']) ? $_POST['photo'] : null;

                // Call the function to add article data
                echo addArticle($title, $content, $photo);

                break;
            case 'add_gallery_album':
                var_dump('addGalleryAlbum function called');

                // Extract data from the POST request
                $albumTitle = isset($_POST['album_title']) ? $_POST['album_title'] : null;
                $folderPath = isset($_POST['folder_path']) ? $_POST['folder_path'] : null;

                // Call the function to add gallery album data
                echo addGalleryAlbum($albumTitle, $folderPath);
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Not Found']);
        }
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
}
