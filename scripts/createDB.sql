DROP DATABASE IF EXISTS ForecastToolDB;
CREATE DATABASE ForecastToolDB;
USE ForecastToolDB;

CREATE TABLE forecastMethods (
    id int auto_increment,
    name varChar(255),
    description varChar(255),
    abbreviation varChar(255),
    bestToUseWhen varChar(255),
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE timePeriods (
    id int auto_increment,
    groupName varChar(255),
    startDate datetime,
    endDate datetime,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE salesData (
    id int auto_increment,
    date datetime,
    data integer,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
CREATE TABLE forecastData (
    id int auto_increment,
    timePeriodID integer,
    m3ma integer,
    m3wa integer,
    linearRegression integer,
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (id)
);
