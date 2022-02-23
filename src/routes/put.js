// -- Importação dos modulos necessários
const express = require('express');

const Models = require('../models/models');
const connection = require('../connection');

const mongoose = connection.readAndWrite;

const schema = Models.JoiSchema;
const Obj = Models.MongoSchema;

// -- Cria uma classe modular, está instância é referida como "mini-app" (gerência as rotas)
const put = express.Router();


put.use( async (req, res, next) => {

    if (await mongoose.connection.readyState == 0) {
        res.status(400).send('Erro ao conectar-se à base de dados.');
    } else {
        next();
    }

}, async (req, res, next) => {

    const { error } = await schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        next();
    }

}, async (req, res, next) => {

    let checkID = await Obj.find({id: req.body.id});
    checkID = JSON.stringify(checkID) == '[]';

    if (checkID) {
        res.status(400).send('Erro ID não existente na base de dados.');
    } else {
        next();
    }

});

put.put('/', async(req, res) => {

    const update = {
        lot: req.body.lot,
        nome: req.body.nome,
        localizacao: req.body.localizacao,
        lotMax: req.body.lotMax,
        lon: req.body.lon,
        lat: req.body.lat,
        url: req.body.url
    };

    await Obj.findOneAndUpdate({id: req.body.id}, update, {new: true}).then((updatedObj) => {
        res.status(201).send(`Documento atualizado com sucesso.\n Objeto atualizado: ${updatedObj}`);
        console.log(`PUT - ENVIADO | IP : ${req.ip}`);
    }).catch((error) => {
        res.status(400).send(`Erro ao atualizar os dados.\n ${error}`);
        console.log('PUT - ERRO')
    });

});

module.exports = put;