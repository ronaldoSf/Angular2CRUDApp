<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'src/dao/UserDAO.php';

$app = new \Slim\App;

$app->error(function (\Exception $e) use ($app) {
    echo $e;
});

$app->get('/user/{id}', function (Request $request, Response $response, array $args) {
    
    $userDAO = new UserDAO;

    $data = $userDAO->getById($args["id"]);

    return $response->withJson($data);
});

$app->get('/user/filter', function (Request $request, Response $response, array $args) {
    
    $userDAO = new UserDAO;

    $data = $userDAO->filter($response->body());

    return $response->withJson($data);
});

$app->get('/user/remove', function (Request $request, Response $response, array $args) {
    
    $userDAO = new UserDAO;

    $data = $userDAO->remove($args["id"]);

    return $response->withJson($data);
});

$app->get('/user/save', function (Request $request, Response $response, array $args) {
    
    $userDAO = new UserDAO;

    $data = $userDAO->save($response->body());

    return $response->withJson($data);
});


$app->run();
?>