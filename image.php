<?php 
    $dir = "uploads/";

    if (isset($_GET["name"])) {
        $name = $_GET["name"];
    } else {
        http_response_code(400);
        echo "Bad Request";
    }

    $path = $dir . basename($name);

    if (file_exists($path)) {
        $mime = mime_content_type($path);

        header("Content-type:". $mime);
        header("Content-size". filesize($path));

        readfile($path);
        exit;
    } else {
        http_response_code(404);
        echo "File not found";
    }
?>