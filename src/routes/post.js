// -- Importação dos modulos necessários
const express = require('express');

const Models = require('../models/models');
const connection = require('../connection');

const mongoose = connection.readAndWrite;

var Obj = Models.MongoSchema; 
const schema = Models.JoiSchema;

// -- Cria uma classe modular, está instância é referido como "mini-app" (gerência as rotas)
const post = express.Router();


// -- Middleware utilizado para verificar e enviar ao utilizador se a conecção à base de dados está estabelecida, caso não esteja estabelecida é enviada uma mensagem de erro
post.use( async (req, res, next) => {

    if(await mongoose.connection.readyState == 0) {
        res.status(400).send('Erro ao conectar-se à base de dados.');

    } else {
        next();

    }

// -- Middleware utilizado para verificar se o json enviado para o servidor tem os parâmetros base necessários (utiliza JOI), se extes paràmetros não forem cumpridos 
// -- é enviado uma mensagem de erro
}, async (req, res, next) => {

    const { error } = await schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);

    } else {
        next();

    }

// -- Middleware utilizado para encontrar e verificar se o ID no json existe na base de dados, se existir é enviado ao utilizador uma mensagem de erro
}, async (req, res, next) => {

    await Obj.find({id: req.body.id}).then((result) => {
        if(result.length > 0) {
            res.status(400).send('Erro ID existente na base de dados...');

        } else {
            next();
            
        }
    });

});


// -- Caso todos os middlewares acima sejam cumpridos, o programa tenta inserir os dados, caso não seja possivel é enviada uma mensagem de erro
post.post('/', async (req, res) => {

    let obj = new Obj({
        id: req.body.id,
        nome: req.body.nome,
        localizacao: req.body.localizacao,
        lot: req.body.lot,
        lotMax: req.body.lotMax,
        lat: req.body.lat,
        lon: req.body.lon,
        url: req.body.url
    }); 

    await obj.save().then(() => {

        res.status(201).send(`Documento salvo com sucesso.\nObjeto : \n${obj}`);
        console.log(`POST - ENVIADO | IP : ${req.ip}`);

    }).catch((error) => {

        res.status(400).send(`Erro ao inserir os dados ${error}`);
        console.log('POST - ERRO');

    });

});

module.exports = post;