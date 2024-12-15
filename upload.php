<?php
    require 'db.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $dir = "uploads/";
        $file = $dir . basename($_FILES["uploadImage"]["name"]);
        $status = 0;
        $type = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        if (isset($_POST["submit"])) {
            $size =  getimagesize($_FILES["uploadImage"]["tmp_name"]);
            if ($size !== false) {
                echo "File is an image" . $size['mime']. ".";
                $status = 1;
            } else {
                echo "File isn't an image";
                $status = 0;
            }
        }

        if (file_exists($file)) {
            echo "the image is already added";
            $status = 0;
        }

        if ($_FILES["uploadImage"]["size"] > 5000000) {
            echo "file is to large";
            $status = 0;
        }

        if ($type != "jpg" && $type != "png" && $type != "jpeg" && $type != "gif") {
            echo "file type isn't supported";
            $status = 0;
        }

        if ($status == 0) {
            echo "Error, your file is didn't uploaded";
        } else {
            if (move_uploaded_file($_FILES["uploadImage"]["tmp_name"], $file)) {
                echo "The file ". htmlspecialchars(basename(($_FILES["fileToUpload"]["name"]))) . "has been uploaded";
                $fileName = basename($_FILES["uploadImage"]["name"]);
                $query = "INSERT INTO images (fileName) values ('$fileName')";
                if ($conn -> query($query) == TRUE) {
                    echo "Nama file gambar berhasil masuk database";
                } else {
                    echo "sintaks error";
                }
            }
        }
    } else {
        echo "Hello world, seharusnya anda tidak boleh sampai sini";
    }

    $conn -> close()
?>