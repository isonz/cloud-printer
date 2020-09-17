<?php
$id  = isset($_POST['id']) ? $_POST['id'] : 0;
$printer  = isset($_POST['printer']) ? $_POST['printer'] : null;

if($id){
    $data = array('printer_01' => $printer);
    Locations::update($id, $data);
    exit;
}




$locations = Locations::getAll();

Templates::Assign('locations', $locations);
Templates::Display('printers.tpl');
