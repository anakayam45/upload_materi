<?php
include "db.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Detail file
    
    $targetDir = "uploads/";
    $fileName = urlencode(basename($_FILES['image']['name']));
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    header("Content-Type: application/json");
    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file(($_FILES['image']['tmp_name']), $targetFilePath)) {
            echo json_encode(["status" => "success", "message" => "File uploaded successfully.", "file" => urlencode($fileName)]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid file type."]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $files = array_diff(scandir("uploads/"), array('.', '..'));
    unset($files[array_search('index.php', $files)]);
    foreach ($files as $x) {
        $encodedName = urlencode($x); // Encode nama file untuk digunakan di URL
        echo "<a href='image.php?name={$encodedName}'>" . htmlspecialchars($x) . "</a><br>";
    }
} else {
    header("Content-Type: application/json");
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}
?>