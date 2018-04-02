<?php

$inc = '../src/util.php';
//echo $inc;
include($inc);

class ClientDao {
	
	function getById($id) {
		try {

			$res = Util::getCon()->prepare("SELECT * FROM client WHERE id = :id");
			$res->bindValue(':id', $id);

			$res->execute();
			return $res->fetch(PDO::FETCH_ASSOC);

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
	}
	
	function getByFilters($data) {

		try {

			$where 	= "";
			$where .= Util::sqlPart($data, "name", " AND name ILIKE :name");
			
			$offset = Util::sqlPart($data, "offset", "OFFSET " . $data["offset"]);
			$limit 	= Util::sqlPart($data, "limit", "LIMIT " . $data["limit"]);
			$sort   = Util::sqlPart($data, "sortBy", "OFFSET " . "ORDER BY " . $data["sortBy"] . $data["sortType"] . "");

			$sqlItems = "SELECT * FROM client WHERE 1 = 1 $where $sort $offset $limit";
			$sqlCount = "SELECT count(*) as countttttt FROM client WHERE 1 = 1 $where ";

			$resItems = Util::getCon()->prepare($sqlItems);
			$resCount = Util::getCon()->prepare($sqlCount);
			
			Util::sqlBindStr($data, 'name', $resItems);
			Util::sqlBindStr($data, 'name', $resCount);

			$resItems->execute();
			$resCount->execute();

			$items = $resItems->fetchAll(PDO::FETCH_ASSOC);
			$count = $resCount->fetch(PDO::FETCH_ASSOC)['countttttt'];

			return array("items" => $items, "total" => intval($count));

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
	}
	
	function save($data) {
		

		try {
			//echo json_encode($data);
			$stmt = Util::getCon()->prepare('INSERT INTO client (name, cnpj, image)
			 VALUES (:name, :cnpj, :image) RETURNING id');
		
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':cnpj', $data['cnpj']);
			$stmt->bindValue(':image', $data['image']);

			$stmt->execute();

			return $stmt->fetch(PDO::FETCH_ASSOC);

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
		
		return null;
	}
	
	function remove($ids) {

		try {

			$inQuery = str_repeat('?,', count($ids) - 1) . ' ?';

			$stmt = Util::getCon()->prepare("DELETE FROM client WHERE id IN ($inQuery)");
			
			foreach ($ids as $k => $id) {
    			$stmt->bindValue($k+1, $id);
			}

			$stmt->execute();

			return null;
		} catch (PDOException $e) {
			echo $e->getMessage();
			return $e->getMessage(); 
		}
	}
}

class Client {

}

?>