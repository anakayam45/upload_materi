<?php
header("Access-Control-Allow-Origin: *"); // Mengizinkan semua origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Metode yang diizinkan
header("Access-Control-Allow-Headers: Content-Type"); // Header yang diizinkan

$conn = mysqli_connect("localhost","root","","belajar_ngoding");
if(!$conn) {
    die("Ada masalah di server, jangan dicoba dulu!" . mysqli_connect_error());
}
?>