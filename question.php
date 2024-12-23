<?php
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["id"]) && isset($_POST["quest"])) {
        // Insert pertanyaan
        $stmt = $conn->prepare("INSERT INTO questions (material_id, question_text) VALUES (?, ?)");
        $stmt->bind_param("is", $_POST["id"], $_POST["quest"]);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "question_id" => $stmt->insert_id]);
        } else {
            echo json_encode(["status" => "error", "message" => "Gagal menyimpan pertanyaan"]);
        }
    } else if (isset($_POST["id"]) && isset($_POST["choice"]) && isset($_POST["correct"])) {
        // Insert pilihan jawaban
        $stmt = $conn->prepare("INSERT INTO choices (question_id, choice_text, is_correct) VALUES (?, ?, ?)");
        $stmt->bind_param("isi", $_POST["id"], $_POST["choice"], $_POST["correct"]);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Pilihan berhasil ditambahkan"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Gagal menyimpan pilihan"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Data tidak valid"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Metode HTTP tidak valid"]);
}
?>
