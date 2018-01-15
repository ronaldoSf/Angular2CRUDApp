<?php
require 'src/generic/GenericDAO.php';
require 'src/util/DBUTIL.php';

class UserDAO implements GenericDAO {
    
    function get($id) {
        return DBUTIL::get(
            "user", 
            ["name", "login", "password"], 
            ["id" => $id]
        );
    }

    function filter($filters) {

    }

    function remove($id) {

    }

    function save($entity) {

    }
}

?>