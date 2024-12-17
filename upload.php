<?php
include "db.php";
    header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Detail file
    $targetDir = "uploads/";
    $fileName = basename($_FILES['image']['name']);
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            echo json_encode(["status" => "success", "message" => "File uploaded successfully.", "file" => $fileName]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid file type."]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $files = array_diff(scandir("uploads/"), array('.', '..'));
    array_shift($files);
    echo json_encode(
        [
            "status" => "ok",
            "message"=> $files
        ]
    );
} else {
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}
?>