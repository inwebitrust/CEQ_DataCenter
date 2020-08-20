<?php
require_once("config.php");

ini_set('display_errors', 1);

$COUNTRIES = array();

$queryCountries = "SELECT DISTINCT country_code, start_year, reference, source, citation FROM ".$DBTABLES["datavalues"] or die("Error in the consult.." . mysqli_error($link));
$resultCountries = $link->query($queryCountries);
while($row = mysqli_fetch_assoc($resultCountries)) {
    array_push($COUNTRIES, $row);
}

echo json_encode($COUNTRIES);

?>