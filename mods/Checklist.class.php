<?php
class Checklist extends ABase
{
	static public $_class = __CLASS__;
	static public $_table = '#_checklist';
	
	static public function getData(array $condition)
	{
		if(!$condition) return false;
		$info = self::getOne($condition, "*");
		return $info;
	}

}


