<?php
    include "db.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $query = "INSERT INTO news (description, image, type) VALUES (".$_POST["desc"].", '".$_POST["image"]."', '".$_POST["type"]."');";
            if ($conn -> query($query) == TRUE) {
                echo "Add new Materi" . $_POST["title"];
            } else {
                echo "sintaks error";
            }
    } else {
        echo "Metode tidak valid";
    }
?>