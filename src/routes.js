const express = require('express');
const movieController = require('./modules/movie/movie.controller');

const movieValidator = require('./validators/movie.validator');

const routes = express.Router();
routes.post('/api/movie', movieValidator.validationBodyRulesCreate,movieController.create);
routes.put('/api/movie/:id', movieValidator.validationRulesParam,movieController.update);
routes.delete('/api/movie/:id', movieValidator.validationRulesParam,movieController.delete);
routes.get('/api/movie/all', movieController.all);

module.exports = routes;