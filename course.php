<?php
    require 'db.php';
    header("Content-Type: application/json"); // Format respons
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["nama"]) and isset($_POST["desc"]) and isset($_POST["dura"])) {
            $nama = mysqli_real_escape_string( $conn, $_POST["nama"] );
            $desc = mysqli_real_escape_string( $conn, $_POST["desc"] );
            $image = mysqli_real_escape_string( $conn, $_POST["image"] );
            $dur = mysqli_real_escape_string( $conn, $_POST["dura"] );
            $query = "INSERT INTO courses (name, description, image, category, duration) VALUES ('$nama', '$desc', $image, 'programing', '$dur')";
            if (mysqli_query($conn, $query)) {
                echo "Berhasil bang";
            } else {
                echo "Gagal: " . mysqli_error($conn);
            }
        } else {
            echo "Semua field harus di isi";
        }
    }
    else if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (isset($_GET["see"])) {
            $result = mysqli_query($conn,"select * from courses");
            $courses = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($courses);
        } else {
            echo "Data tidak valid";
        }
    }
    else {
        echo "Metode tidak valid";
    }
?>