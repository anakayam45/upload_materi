<?php
    include "db.php";
    header("Content-Type: application/json"); // Format respons
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["course"])) {
            $query = "INSERT INTO materials (course_id, title, description) VALUES (".$_POST["id"].", '".$_POST["title"].", '".$_POST["desc"]."');";
            if ($conn -> query($query) == TRUE) {
                echo "Add new Materi" . $_POST["title"];
            } else {
                echo "sintaks error";
            }
        } else if (isset($_POST["materi"])) {
            $query = "INSERT INTO material_contents (material_id, content, type) VALUES (".$_POST["id"].", '".$_POST["content"]."', '".$_POST["type"]."');";
            if ($conn -> query($query) == TRUE) {
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo "not";
        }
    } else if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (isset($_GET["see"])) {
            $result = mysqli_query($conn,"select * from materials");
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


