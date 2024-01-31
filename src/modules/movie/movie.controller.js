const { validationResult } = require('express-validator');
const MovieService = require('./movie.service')

class MovieController {

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).send({ errors: errors.array() });
          return;
        }

        const movies = await MovieService.create(req.body);
        return res.status(201).send(movies);
    }

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).send({ errors: errors.array() });
          return;
        }
        const movies = await MovieService.update(req.params.id, req.body);
        return res.json(movies);
    }

    async delete(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).send({ errors: errors.array() });
          return;
        }
        const movies = await MovieService.delete(req.params.id);
        return res.json(movies);
    }

    async all(req, res) {
        const movies = await MovieService.all();
        return res.json(movies);
    }
}

module.exports = new MovieController();