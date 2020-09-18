<?php
$checklistId  = isset($_POST['checklistId']) ? (int)$_POST['checklistId'] : 0;
if($checklistId){
    $data = Checklist::getOne(array('id' => $checklistId));
    exit(json_encode($data));
}

Templates::Display('windows.tpl');
