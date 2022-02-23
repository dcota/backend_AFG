const express = require('express');

const connection = require('../connection');
const Models = require('../models/models');

const mongoose = connection.readAndWrite;

const delete_ = express.Router({mergeParams: true});
var Obj = Models.MongoSchema;

delete_.use('/:id', async (req, res, next) => {

    if (await mongoose.connection.readyState === 0) {
        res.status(400).send('Erro ao conectar-se à base de dados.');

    } else {
        next();

    }

}, async (req, res, next) => {

    await Obj.find({id: req.params.id}).then((result) => {

        if (result.length==0) {
            res.status(400).send('ID não presente na base de dados.');

        } else {
            next();

        }

    }).catch( (err) => {
        res.status(400).send(err.message);

    });
});

delete_.delete('/:id', async (req, res)  => {

    await Obj.deleteOne({id : req.params.id}).then(() => {
        res.status(201).send('Objeto deletado com sucesso.');

    }).catch((err) => {
        res.status(400).send(err.message);
    
    });


}); 

module.exports = delete_;