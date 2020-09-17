<?php
error_reporting(E_ALL);
ini_set("display_startup_errors","1");
ini_set("display_errors","On");

ini_set('date.timezone','Asia/Shanghai');

//======================================= Basic
if (!defined('DS')) {
    define('DS', DIRECTORY_SEPARATOR);
}
if(!defined('_SITE')){
    define('_SITE', dirname(__FILE__) . DS);
}
if(!defined('_LIBS')){
    define('_LIBS', _SITE . 'libs' . DS);
}
if(!defined('_MODS')){
    define('_MODS', _SITE . 'mods' . DS);
}
if(!defined('_MODULES')){
    define('_MODULES', _SITE . 'modules' . DS);
}
if(!defined('_DATA')){
    define('_DATA', _SITE . 'data' . DS);
}
if(!defined('_LOGS')){
    define('_LOGS', _DATA . 'logs' . DS);
}
foreach (glob(_LIBS."/*.php") as $libs){
    require_once $libs;
}
foreach (glob(_MODS."/*.php") as $mods){
    require_once $mods;
}
foreach (glob(_MODULES."/*.php") as $modules){
    require_once $modules;
}


if(!defined('_SMARTY')){
    define('_SMARTY', _LIBS . 'Smarty' . DS);
}
if(!defined('_SMARTY_TEMPLATE')){
    define('_SMARTY_TEMPLATE', _SITE .'template');
}
if(!defined('_SMARTY_COMPILED')){
    define('_SMARTY_COMPILED', _DATA . 'compileds');
}
if(!defined('_SMARTY_CACHE')){
    define('_SMARTY_CACHE', _DATA . 'caches');
}


//======================================== Config
$GLOBALS['CONFIG_DATABASE'] = array(
	'host'      => '127.0.0.1',
    'user'      => 'root',
    'pwd'       => 'admin888',
    'dbname'    => 'cloud-printer',
	'port'      => 3306,
	'tb_prefix' => 'cp_'
);
