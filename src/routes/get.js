const express = require('express');

const geolib = require('geolib');

const connection = require('../connection');
const Models = require('../models/models'); 


const mongoose = connection.readAndWrite;

const schema = Models.JoiSchemaGet;
const Obj = Models.MongoSchema;

const get = express.Router();

get.use('/getAll', async (req, res) => {

    Obj.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

get.use( async (req, res, next) => {

    if (await mongoose.connection.readyState == 0) {
        res.send('Erro ao conectar-se à base de dados.');
        console.log("err");
    } else {
        next();
    }

});

get.get('/:lonParam/:latParam', async (req, res) => {

    var flag = true;

    var allObj = await Obj.find({}).catch( (err) => {
        res.send(err);
        flag = false;
    });


    if(flag) {
        var validObj = {};
        var key = 'ListaDeObjetos';
        validObj[key] = [];

        for(i = 0; i < allObj.length; i++) {

            let lon = req.params.lonParam;
            let lat = req.params.latParam; 

            let latObj = allObj[i].lat;
            let lonObj = allObj[i].lon;

            if(geolib.isPointWithinRadius({latitude: latObj , longitude: lonObj}, {latitude: lat, longitude: lon}, 50000)) {
                var data = {
                    "id": allObj[i].id,
                    "lot": allObj[i].lot,
                    "lotMax": allObj[i].lotMax,
                    "lat": allObj[i].lat,
                    "lon": allObj[i].lon,
                    "url": allObj[i].url
                }
                validObj[key].push(data);
                
            }
        }
        res.send(validObj);
        console.log(`GET - ENVIADO | IP - ${req.ip}`);
    }
});


module.exports = get;