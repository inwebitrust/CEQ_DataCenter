<?php
require_once("config.php");

function createInClause($arr){
    return '\'' . implode( '\', \'', $arr ) . '\'';
}

$DATAVALUES = array();

$indicatorsArray = explode(",",$_GET["indicatorsIDS"]);

if(sizeof($indicatorsArray) > 0) {
	$indicatorsString = createInClause($indicatorsArray);

	$query = "SELECT country_code, start_year, end_year, indicator_id, indicator_value FROM ".$DBTABLES["datavalues"]." WHERE indicator_id IN (".$indicatorsString.")";
	$queryIndicators = $query or die("Error in the consult.." . mysqli_error($link));
	$resultIndicators = $link->query($queryIndicators);
	while($row = mysqli_fetch_assoc($resultIndicators)) {
	    array_push($DATAVALUES, $row);
	}
}

echo json_encode($DATAVALUES);


?>