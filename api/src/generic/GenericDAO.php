<?php

interface GenericDAO {
    function get($id);
    function filter($filters);
    function remove($id);
    function save($entity);
}

?>