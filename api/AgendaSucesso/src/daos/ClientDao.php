<?php

include_once('../src/util.php');


class ClientDao {
	
	function getById($id) {
		try {

			$res = Util::getCon()->prepare("SELECT city.ufSigla as \"ufSigla\", c.name, c.image, c.id, c.cnpj, c.categoryid as \"categoryId\", c.cityid as \"cityId\", importanceOrder as \"importanceOrder\", c.description 
                        FROM client c LEFT JOIN city ON city.id = c.cityId
                        WHERE id = :id");

			$res->bindValue(':id', $id);
            $res->execute();
            
			$item = $res->fetch(PDO::FETCH_ASSOC);

			$resInfs = Util::getCon()->prepare("SELECT * FROM client_information WHERE clientId = :clientId");
			$resInfs->bindValue(":clientId", $item['id']);
			$resInfs->execute();
			$item['informations'] = $resInfs->fetchAll(PDO::FETCH_ASSOC);

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
			
			$offset = Util::sqlPart($data, "offset", "OFFSET " . $data["offset"]);
			$limit 	= Util::sqlPart($data, "limit", "LIMIT " . $data["limit"]);
			$sort   = Util::sqlPart($data, "sortBy", "OFFSET " . "ORDER BY " . $data["sortBy"] . $data["sortType"] . "");

			$sqlItems = "SELECT city.ufSigla as \"ufSigla\", c.name, c.image, c.id, c.cnpj, c.categoryid as \"categoryId\", c.cityid as \"cityId\", importanceOrder as \"importanceOrder\", c.description 
                        FROM client c LEFT JOIN city ON city.id = c.cityId
                        WHERE 1 = 1 $where $sort $offset $limit";
			$sqlCount = "SELECT count(*) as countttttt 
                        FROM client 
                        WHERE 1 = 1 $where ";

			$resItems = Util::getCon()->prepare($sqlItems);
			$resCount = Util::getCon()->prepare($sqlCount);
			
			Util::sqlBindStr($data, 'name', $resItems);
			Util::sqlBindStr($data, 'name', $resCount);

			$resItems->execute();
			$resCount->execute();

			$items = $resItems->fetchAll(PDO::FETCH_ASSOC);
			$count = $resCount->fetch(PDO::FETCH_ASSOC)['countttttt'];

			foreach ($items as $key => $item) {
				$resInfs = Util::getCon()->prepare("SELECT * FROM client_information WHERE clientId = :clientId");
				$resInfs->bindValue(":clientId", $item['id']);
				$resInfs->execute();
				
				$item["informations"] = $resInfs->fetchAll(PDO::FETCH_ASSOC);
				$items[$key] = $item;
			}

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
				$stmt = Util::getCon()->prepare('UPDATE client SET name = :name, cnpj = :cnpj, image = :image, cityId = :cityId, categoryId = :categoryId, importanceOrder = :importanceOrder, description = :description
							WHERE id = :id RETURNING id');
				$stmt->bindValue(':id', $data['id']);
			} else {
				$stmt = Util::getCon()->prepare('INSERT INTO client (name, cnpj, image, categoryId, cityId, importanceOrder, description)
				VALUES (:name, :cnpj, :image, :categoryId, :cityId, :importanceOrder, :description) RETURNING id');
			}
			
		
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':cnpj', $data['cnpj']);
			$stmt->bindValue(':image', $data['image']);
			$stmt->bindValue(':categoryId', intval($data['categoryId']));
			$stmt->bindValue(':cityId', intval($data['cityId']));
			$stmt->bindValue(':importanceOrder', intval($data['importanceOrder']));
            $stmt->bindValue(':description', $data['description']);
            
			$stmt->execute();

			$clientId = $stmt->fetch(PDO::FETCH_ASSOC)['id'];


			$stmt = Util::getCon()->prepare('DELETE FROM client_information WHERE clientId = :clientId');
			$stmt->bindValue(':clientId', $clientId);
			$stmt->execute();

			$informations = $data['informations'];

			foreach ($informations as $inf) {
				$stmt = Util::getCon()->prepare('INSERT INTO client_information (type, value, clientId)
					VALUES (:type, :value, :clientId)');

				$stmt->bindValue(':clientId', $clientId);
				$stmt->bindValue(':type', $inf['type']);
				$stmt->bindValue(':value', $inf['value']);

				$stmt->execute();
			}

			return array("id" => $clientId);

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
    

	function uploadImage() {
		$imageName = "image";

		if ( isset( $_FILES[ $imageName ][ 'name' ] ) && $_FILES[ $imageName ][ 'error' ] == 0 ) {
			//echo 'Você enviou o arquivo: <strong>' . $_FILES[ $imageName ][ 'name' ] . '</strong><br />';
			//echo 'Este arquivo é do tipo: <strong > ' . $_FILES[ $imageName ][ 'type' ] . ' </strong ><br />';
			//echo 'Temporáriamente foi salvo em: <strong>' . $_FILES[ $imageName ][ 'tmp_name' ] . '</strong><br />';
			//echo 'Seu tamanho é: <strong>' . $_FILES[ $imageName ][ 'size' ] . '</strong> Bytes<br /><br />';
		 
			$arquivo_tmp = $_FILES[ $imageName ][ 'tmp_name' ];
			$nome = $_FILES[ $imageName ][ 'name' ];
		 
			// Pega a extensão
			$extensao = pathinfo ( $nome, PATHINFO_EXTENSION );
		 
			// Converte a extensão para minúsculo
			$extensao = strtolower ( $extensao );
		 
			// Somente imagens, .jpg;.jpeg;.gif;.png
			// Aqui eu enfileiro as extensões permitidas e separo por ';'
			// Isso serve apenas para eu poder pesquisar dentro desta String
			if ( strstr ( '.jpg;.jpeg;.gif;.png', $extensao ) ) {
				// Cria um nome único para esta imagem
				// Evita que duplique as imagens no servidor.
				// Evita nomes com acentos, espaços e caracteres não alfanuméricos
				$novoNome = uniqid ( time () ) . '.' . $extensao;
                
				// Concatena a pasta com o nome
				$destino = str_replace("\\", "/", __DIR__) . '/../../imagens/' . $novoNome;
				$link = "http://" . $_SERVER['SERVER_NAME'] . str_replace($_SERVER['DOCUMENT_ROOT'], "", $destino);
                
                //echo ($_SERVER['DOCUMENT_ROOT'] . "<br/>");
				//echo ($destino . "<br/>");
                //echo ($link . "<br/>");
                //die();

				// tenta mover o arquivo para o destino
				if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
					//echo 'Arquivo salvo com sucesso em : <strong>' . $destino . '</strong><br />';
					//echo ' < img src = "' . $destino . '" />';
					return array("status" => "OK", "result" => array("link" => $link, "destino" => $destino));
				}
				else {
					//echo 'Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita em ' . $destino;					
					return array("status" => "ERROR", "cause" => 'Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita em ' . $destino);
				}
			}
			else {
				//echo 'Você poderá enviar apenas arquivos "*.jpg;*.jpeg;*.gif;*.png"<br />';
				return array("status" => "ERROR", "cause" => 'Você poderá enviar apenas arquivos "*.jpg;*.jpeg;*.gif;*.png"<br />');
			}
		}
		else {
			//echo 'Você não enviou nenhum arquivo!';
			return array("status" => "ERROR", "cause" => 'Você não enviou nenhum arquivo!');
		}
	}
}

?>