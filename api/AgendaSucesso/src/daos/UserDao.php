<?php

include_once('../src/util.php');

class UserDao {
	

	function login($data) {
		
		try {

			$res = Util::getCon()->prepare("SELECT * FROM ags.user WHERE login = :login AND password =  :password");

			$res->bindValue(':login', $data['login']);
			$res->bindValue(':password', sha1($data['password']));

			$res->execute();
			$user = $res->fetch(PDO::FETCH_ASSOC);

			if ($user != null) {
				
				$res = Util::getCon()->prepare("UPDATE ags.user SET hashs = array_append(hashs, :newHash) WHERE id = :id");

				$newHash = sha1($this->generateRandomString());

				$res->bindValue(':newHash', $newHash);
				$res->bindValue(':id', $user['id']);

				$res->execute();

				unset($user['hashs']);
				unset($user['password']);

				return array("status" => "OK", "result" => array("hash" => $newHash, "user" => $user));
			} else {
				return array("status" => "ERROR", "cause" => "Usuário ou senha inválida");
			}

		} catch (PDOException $e) {
			return array("status" => "ERROR", "cause" => $e->getMessage());
		}

	}

	function isLogged($data) {
		$res = Util::getCon()->prepare("SELECT * FROM ags.user 
			WHERE :hash = ANY(hashs)
			AND id = :id");

		$res->bindValue(':hash', $data['hash']);
		$res->bindValue(':id', $data['id']);

		$res->execute();

		$user = $res->fetch(PDO::FETCH_ASSOC);

		if ($user != null) {
			return true;
		} else {
			return false;
		}
	}

	function generateRandomString($length = 10) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
	
	function getById($id) {

	}
	
	function getByFilters($id) {

	}

	function save($data) {

	}
	
	function remove($id) {
		
	}
}

?>