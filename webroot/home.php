<?php

$checklistId = isset($_POST['checklistId']) ? (int)trim($_POST['checklistId']) : 0;
$locationId  = isset($_POST['locationId']) ? (int)trim($_POST['locationId']) : 0;
$status  = isset($_POST['status']) ? (int)trim($_POST['status']) : 0;

if($checklistId && $locationId){
    $condition = array('location_id' => $locationId, 'checklist_id' => $checklistId);
    $data = $condition;
    $status = $status+1;
    $data['status'] = $status;

    $print_id = 0;
    $printer = Printer::getOne($condition);
    if(!$printer){
        $print_id = Printer::insert($data);
    }else{
        $printer = Printer::update($condition, array('status' => $status));
        $checklists = Checklist::update($checklistId, array('status' => $status));
    }

    exit(json_encode($data));
}

//DB::Debug();
$locations = Locations::getAll();
$checklists = Checklist::getList('user_id=1');
foreach ($checklists as $key => $checklist){
    $checklist_id = (int)$checklist['id'];
    $printers = Printer::getList("checklist_id=$checklist_id");
    $checklists[$key]['printers'] = $printers;
}

//var_dump($checklists);
Templates::Assign('locations', $locations);
Templates::Assign('checklists', $checklists);

Templates::Display('home.tpl');
