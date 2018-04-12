<?php


class Util {

	/*static $instance;

	static function getInstance() {
		if (Util::)
	}*/

	static function getCon() {

		$con = new PDO(
		    //'pgsql:host=localhost;port=5432;dbname=postgres', 'postgres', '121212',
		    'pgsql:host=localhost;port=5433;dbname=ags', 'postgres', '1',
		    array(
		        PDO::ATTR_PERSISTENT => true
		    )
		);

		$con->prepare("set search_path to 'ags'")->execute();

		$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		return $con;
	}

	static function hasKeys(array $arr, array $keys) {

		$keysNotFound = [];

		foreach ($keys as $key) {
			if (!array_key_exists($key, $arr)) {
				$keysNotFound[] = $key;
			}
		}
	   	
	   	return count($keysNotFound) <= 0 ? null : $keysNotFound;
	}

	static function makeError($message) {
		return array("status" => "ERROR", "cause" => $message);
	}

	static function makeSuccess($data) {
		return array("status" => "OK", "result" => $data);
	}

	static function inArray($key, $data) {
		//echo $key . ": " . $data[$key];
		return array_key_exists($key, $data) && $data[$key] != null && $data[$key] != "null";
	}

	static function sqlPart($data, $key, $sql) {
		return Util::inArray($key, $data) ? $sql : "";
	}

	static function sqlBind($data, $key, $pdo) {
		if (Util::inArray($key, $data)) {
			$pdo->bindValue(':'.$key, $data[$key]);
		}
	}

	static function sqlBindStr($data, $key, $pdo) {
		if (Util::inArray($key, $data)) {
			$pdo->bindValue(':'.$key, "%" . $data[$key] . "%");
		}
	}
}

?>