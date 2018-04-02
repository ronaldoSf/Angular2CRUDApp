<?php

include_once('../src/util.php');

class CityDao {
	
	function getStates() {
		try {

			$res = Util::getCon()->prepare("SELECT * FROM ags.state");

			$res->execute();
			$items = $res->fetchAll(PDO::FETCH_ASSOC);

			return $items;

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
	}
	
	function getCitiesByState($ufSigla) {
		try {

			$res = Util::getCon()->prepare("SELECT * FROM ags.city WHERE ufSigla = :ufSigla");

			$res->bindValue(":ufSigla", $ufSigla);

			$res->execute();

			$items = $res->fetchAll(PDO::FETCH_ASSOC);

			return $items;

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
	}
}

?>