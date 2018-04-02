<?php

use Slim\Http\Request;
use Slim\Http\Response;

include("daos/ClientDao.php");
include("daos/UserDao.php");
include("daos/CategoryDao.php");
include("daos/CityDao.php");
// Routes

$clientDao = new ClientDao();
$userDao = new UserDao();
$categoryDao = new CategoryDao();
$cityDao = new CityDao();

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


//------------------------ CITY ---------------------------------------------
$app->get('/states', function (Request $request, Response $response, array $args) {

    global $cityDao;
	$objResponse = $cityDao->getStates();

    return $response->withJson(Util::makeSuccess($objResponse));
});

$app->get('/citiesByState', function (Request $request, Response $response, array $args) {
	$data = $request->getQueryParams();
	
	if ($keysNotFound = Util::hasKeys($data, ["ufSigla"])) {
    	return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
	} else {
		global $cityDao;
		$objResponse = $cityDao->getCitiesByState($data['ufSigla']);
    	
    	return $response->withJson(Util::makeSuccess($objResponse));
	}
});

//------------------------ CLIENT ---------------------------------------------
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


//------------------------ CATEGORY ---------------------------------------------
$app->get('/category/{id}', function (Request $request, Response $response, array $args) {
	$id = $args['id'];

    global $categoryDao;
	$objResponse = $categoryDao->getById($id);

    return $response->withJson(Util::makeSuccess($objResponse));
});

$app->get('/category', function (Request $request, Response $response, array $args) {
    $data = $request->getQueryParams();

    global $categoryDao;
	$objResponse = $categoryDao->getByFilters($data);

	return $response->withJson(Util::makeSuccess($objResponse));
});

$app->put('/category', function (Request $request, Response $response, array $args) {
	$data = $request->getParsedBody();

	if ($keysNotFound = Util::hasKeys($data['model'], ["name"])) {
    	return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
	} else {
		global $categoryDao;
		$objResponse = $categoryDao->save($data['model']);
    	
    	return $response->withJson(Util::makeSuccess($objResponse));
	}
});

$app->delete('/category', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    if ($keysNotFound = Util::hasKeys($data, ["ids"])) {
        return $response->withJson(Util::makeError("Fields Missing: ".json_encode($keysNotFound)));
    } else {
        global $categoryDao;
        $objResponse = $categoryDao->remove($data['ids']);
        
        return $response->withJson(Util::makeSuccess($objResponse));
    }
});


//----------------------------------------- USER -------------------------------------------------
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


$app->post('/uploadImage', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

	global $clientDao;
	$objResponse = $clientDao->uploadImage();
	
    return $response->write(json_encode($objResponse, JSON_UNESCAPED_SLASHES));
});

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
