<!-- https:localhost/upload/duestion.php?id=&quest= -->
<?php
    include "db.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST["id"]) and isset($_POST["quest"])) {
            $query = "INSERT INTO questions (material_id, question_text) VALUES (".$_POST["id"].", '".$_POST["quest"]."');";
            if ($conn -> query($query) == TRUE) {
                echo "Add new Question >" . $_POST["quest"];
            } else {
                echo "sintaks error";
            }
        } else if (isset($_POST["id"]) and isset($_POST["choice"]) and isset($_POST["correct"])) {
            $query = "INSERT INTO choices (question_id, choice_text, is_correct) VALUES (<QUESTION_ID>, '<CHOICE_TEXT>', <IS_CORRECT>);";
            if ($conn -> query($query) == TRUE) {
                echo "Add new answer >" . $_POST["choice"] . $_POST["correct"];
            } else {
                echo "sintaks error";
            }
        } else {
            echo "Gagal ngirim data";
        }
    } else if ($_SERVER["REQUEST_METHOD"] == "GET") {
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