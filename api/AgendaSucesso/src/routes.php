<?php

use Slim\Http\Request;
use Slim\Http\Response;

include("daos/ClientDao.php");
include("daos/UserDao.php");
// Routes

$clientDao = new ClientDao();
$userDao = new UserDao();

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/client/{id}', function (Request $request, Response $response, array $args) {
	$id = $args['id'];

    global $clientDao;
	$objResponse = $clientDao->getById($id);

    return $response->withJson(Util::makeSuccess($objResponse));
});

$app->get('/client', function (Request $request, Response $response, array $args) {
    $data = $request->getQueryParams();

    global $clientDao;
	$objResponse = $clientDao->getByFilters($data);

	return $response->withJson(Util::makeSuccess($objResponse));
});

$app->put('/client', function (Request $request, Response $response, array $args) {
	$data = $request->getParsedBody();

	if ($keysNotFound = Util::hasKeys($data['model'], ["name", "cnpj", "image", "informations"])) {
    	return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
	} else {
		global $clientDao;
		$objResponse = $clientDao->save($data['model']);
    	
    	return $response->withJson(Util::makeSuccess($objResponse));
	}
});

$app->delete('/client', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    if ($keysNotFound = Util::hasKeys($data, ["ids"])) {
        return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
    } else {
        global $clientDao;
        $objResponse = $clientDao->remove($data['ids']);
        
        return $response->withJson(Util::makeSuccess($objResponse));
    }
});

$app->post('/login', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    if ($keysNotFound = Util::hasKeys($data, ["login", "password"])) {
        return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
    } else {
        global $userDao;
        $objResponse = $userDao->login($data);
        
        return $response->withJson($objResponse);
    }
});

$app->post('/isLogged', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    if ($keysNotFound = Util::hasKeys($data, ["id", "hash"])) {
        return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
    } else {
        global $userDao;
        $objResponse = $userDao->isLogged($data);
        
        return $response->withJson(Util::makeSuccess($objResponse));
    }
});

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
