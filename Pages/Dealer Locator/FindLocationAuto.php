<?php
require("dbinfo.php");

// Get parameters from URL
$center_lat = $_GET["lat"];
$center_lng = $_GET["lng"];
$radius = $_GET["radius"];

$center_lat = ( isset( $_GET["lat"] ) ? $_GET["lat"] : -25.08 ); // Default latitude - Andrew
$center_lng = ( isset( $_GET["lng"] ) ? $_GET["lng"] : 134.07 ); // Default longitude - Andrew
$radius     = ( isset( $_GET["radius"] ) ? $_GET["radius"] : 25 ); // Default radius - Andrew

// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("geocodes");
$parnode = $dom->appendChild($node);

// Opens a connection to a mySQL server 203.32.33.26
$connection=mysql_connect ('localhost', $username, $password);
if (!$connection) {
  die("Not connected : " . mysql_error());
}

// Set the active mySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ("Can\'t use db : " . mysql_error());
}

// Add a column in the DB and add that field to the end of this SELECT statement - Andrew
// You can change the table in the FROM statement - Andrew
$query = sprintf("SELECT address, name, lat, lng, website, phone, storeType, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM LinkDealers HAVING distance < '%s' ORDER BY distance LIMIT 0 , 200",
  mysql_real_escape_string($center_lat),
  mysql_real_escape_string($center_lng),
  mysql_real_escape_string($center_lat),
  mysql_real_escape_string($radius));
$result = mysql_query($query);

if (!$result) {
  die("Invalid query: " . mysql_error());
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = @mysql_fetch_assoc($result)){
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("name", $row['name']);
  $newnode->setAttribute("address", $row['address']);
  $newnode->setAttribute("website", $row['website']);
  $newnode->setAttribute("phone", $row['phone']);
  $newnode->setAttribute("storeType", $row['storeType']);
  $newnode->setAttribute("lat", $row['lat']);
  $newnode->setAttribute("lng", $row['lng']);
  $newnode->setAttribute("distance", $row['distance']);
}

echo $dom->saveXML();
?>