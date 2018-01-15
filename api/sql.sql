DROP TABLE IF EXISTS crud.state;
CREATE TABLE crud.state (
	id serial PRIMARY KEY,
    shortName varchar(2),
    name varchar
);

DROP TABLE IF EXISTS crud.city;
CREATE TABLE crud.city (
	id serial PRIMARY KEY,
    name varchar,
    stateId integer REFERENCES crud.state (id)
);


DROP TABLE IF EXISTS crud.company;
CREATE TABLE crud.company (
	id serial PRIMARY KEY,
    name varchar,
    cpj varchar,
    birthday date,
    address varchar,
    addressNumber varchar,
    county varchar,
    cep varchar,
    phone1 varchar,
    phone2 varchar,
    cityId integer REFERENCES crud.city (id),
    companyParentId integer --REFERENCES crud.company (id)
);

DROP TABLE IF EXISTS crud.profile;
CREATE TABLE crud.profile (
	id serial PRIMARY KEY,
    name varchar
);

DROP TABLE IF EXISTS crud.permission;
CREATE TABLE crud.permission (
	id serial PRIMARY KEY,
    groupName varchar,
    permsName integer,
    profileId integer REFERENCES crud.profile (id)
);

DROP TABLE IF EXISTS crud.user;
CREATE TABLE crud.user (
	id serial PRIMARY KEY,
    name varchar,
    login varchar, 
    password varchar,
    companyId integer REFERENCES crud.company (id),
    profileId integer REFERENCES crud.profile (id)
);


