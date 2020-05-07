const express = require('express');
const router = express.Router();
const functions = require('./functions');
const errorDef = require('../../utilities/handler/errorDef');
const _ = require('lodash');

const crudUtils = require('../../utilities/crud-utils');
const model = require('@soongwei/mysql-db/databases/fruitBasketMaster').user;
crudUtils(router, model);

module.exports = router;