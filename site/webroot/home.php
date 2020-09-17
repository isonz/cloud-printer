<?php

$checklistId = isset($_POST['checklistId']) ? (int)trim($_POST['checklistId']) : 0;
$locationId  = isset($_POST['locationId']) ? (int)trim($_POST['locationId']) : 0;
$print_num  = isset($_POST['print_num']) ? (int)trim($_POST['print_num']) : 0;

if($checklistId && $locationId){
    $condition = array('location_id' => $locationId, 'checklist_id' => $checklistId);
    $data = $condition;
    $print_num = $print_num+1;
    $data['print_num'] = $print_num;

    $print_id = 0;
    $printer = Printer::getOne($condition);
    if(!$printer){
        $print_id = Printer::insert($data);
    }else{
        $printer = Printer::update($condition, array('print_num' => $print_num));
    }

    $checklist = Checklist::getOne(array('id' => $checklistId));
    $print_num = $checklist['print_num'] + 1;
    Checklist::update($checklistId, array('print_num' => $print_num));

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
