<?php
class Printer extends ABase
{
	static public $_class = __CLASS__;
	static public $_table = '#_print';
	
	static public function getData(array $condition)
	{
		if(!$condition) return false;
		$info = self::getOne($condition, "*");
		return $info;
	}

}


