<?php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_REQUEST['nombre'];
$edad = $_REQUEST['edad'];

echo '<img src=" img/820.gif">';
sleep(3);

echo "Te llamas ". $nombre ." y tenes ". $edad ." años.";

 
?>