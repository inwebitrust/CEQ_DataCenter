<?php
require_once("config.php");

ini_set('display_errors', 1);

$INDICATORS = array();

$queryIndicators = "SELECT * FROM ".$DBTABLES["indicators"]." ORDER BY category, subcategory_1, subcategory_2, name" or die("Error in the consult.." . mysqli_error($link));
$resultIndicators = $link->query($queryIndicators);
while($row = mysqli_fetch_assoc($resultIndicators)) {
    array_push($INDICATORS, $row);
}

echo json_encode($INDICATORS);

?>