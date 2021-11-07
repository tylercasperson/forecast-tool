DROP DATABASE IF EXISTS ForecastToolDB;
CREATE DATABASE ForecastToolDB;
USE ForecastToolDB;

CREATE TABLE dataTypes (
    id int auto_increment,
    name varChar(255),
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE forecastMethods (
    id int auto_increment,
    name varChar(255),
    description varChar(255),
    calculation integer,
    bestToUseWhen varChar(255),
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE timePeriods (
    id int auto_increment,
    type varChar(255),
    startDate datetime,
    endDate datetime,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE data (
    id int auto_increment,
    dataTypeID integer,
    timePeriodID integer,
    data integer,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
