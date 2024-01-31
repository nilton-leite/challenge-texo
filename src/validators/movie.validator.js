const { body, param } = require('express-validator');

exports.validationBodyRulesCreate = [
    body('year').notEmpty().withMessage('year is required'),
    body('title').notEmpty().withMessage('title is required'),
    body('studios').notEmpty().withMessage('studios is required'),
    body('producers').notEmpty().withMessage('producers is required'),
    body('winner').isEmpty().withMessage('winner is required')
];

exports.validationRulesParam = [
    param('id').notEmpty().withMessage('id is required'),
    param('id').isString().withMessage('id needs to be a nedb id')
];