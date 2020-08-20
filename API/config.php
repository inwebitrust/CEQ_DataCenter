<?php
header('Access-Control-Allow-Origin: *');  

/*
$selectedDB = 'ceq';
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'root';
*/

$dbhost = '192.168.1.2';
$dbuser = 'anthony.gesec';
$dbpass = '2xzQRixT5V';
$selectedDB = 'ceq';

/*
$dbname = 'ceq_datacenter';
$dbhost = '206.81.25.219';
$dbuser = 'ceq_user';
$dbpass = 'X=7UkEDAR!NGRW?CjbbqDT&N';
$dbport = 3306;
*/

$DBTABLES = array(
	"countries" => "countries",
	"indicators" => "indicators",
	"datavalues" => "datavalues",
	"datavalues_decile" => "datavalues_decile",
	"datavalues_inccat" => "datavalues_inccat"
);


$link = mysqli_connect($dbhost,$dbuser,$dbpass,$selectedDB) or die("Error " . mysqli_error($link));
$link->set_charset("utf8");


/*
$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname, $dbport) or die("Error " . mysqli_error($link));
$link->set_charset("utf8");
*/
?>