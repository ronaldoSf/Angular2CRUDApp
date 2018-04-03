<?php

include_once('../src/util.php');

class CategoryDao {
	
	function getById($id) {
		try {

			$res = Util::getCon()->prepare("SELECT * FROM category WHERE id = :id");
			$res->bindValue(':id', $id);

			$res->execute();
			$item = $res->fetch(PDO::FETCH_ASSOC);

			return $item;

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
	}
	
	function getByFilters($data) {

		try {

			$where 	= "";
			$where .= Util::sqlPart($data, "name", " AND name ILIKE :name");
			
			$offset = Util::sqlPart($data, "offset", "OFFSET " . @$data["offset"]);
			$limit 	= Util::sqlPart($data, "limit", "LIMIT " . @$data["limit"]);
			$sort   = Util::sqlPart($data, "sortBy", "OFFSET " . "ORDER BY " . @$data["sortBy"] . @$data["sortType"] . "");

			$sqlItems = "SELECT * FROM category WHERE 1 = 1 $where $sort $offset $limit";
			$sqlCount = "SELECT count(*) as countttttt FROM category WHERE 1 = 1 $where ";

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

			if (Util::inArray('id', $data)) {
				$stmt = Util::getCon()->prepare('UPDATE category SET name = :name
							WHERE id = :id RETURNING id');
				$stmt->bindValue(':id', $data['id']);
			} else {
				$stmt = Util::getCon()->prepare('INSERT INTO category (name)
				VALUES (:name) RETURNING id');
			}
			
		
			$stmt->bindValue(':name', $data['name']);

			$stmt->execute();

			$categoryId = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

			return array("id" => $categoryId);

		} catch (PDOException $e) {
			echo $e;
			return null; 
		}
		
		return null;
	}
	
	function remove($ids) {

		try {

			$inQuery = str_repeat('?,', count($ids) - 1) . ' ?';

			$stmt = Util::getCon()->prepare("DELETE FROM category WHERE id IN ($inQuery)");
			
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

?>