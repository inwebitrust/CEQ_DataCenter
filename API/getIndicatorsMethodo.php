<?php
require_once("config.php");

$METHODOS = array();

$queryIndicators = "SELECT * FROM ".$DBTABLES["indicators_methodo"]."" or die("Error in the consult.." . mysqli_error($link));
$resultIndicators = $link->query($queryIndicators);
while($row = mysqli_fetch_assoc($resultIndicators)) {
    array_push($METHODOS, $row);
}

echo json_encode($METHODOS);

?>