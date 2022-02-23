const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const Joi = require('joi');


// -- Criação de um modelo para ser utilizado para inserir dados

const { Schema } = mongoose;

const ObjSchema = new Schema({
    id: {type: Int32, required: true},
    nome: {type: String, required: true},
    localizacao: {type: String, required: true},
    lot: {type: Int32, required: true},
    lotMax: {type: Int32, required: true},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    url: {type: String, required:true}
});

// -- Criação de um objeto da classe JOI para verificação inicial do json

const JoiSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nome: Joi.string().required(),
    localizacao: Joi.string().required(),
    lot: Joi.number().integer().min(0).required(),
    lotMax: Joi.number().integer().min(0).required(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    url: Joi.string().required() 
});

// -- Exportação

module.exports.MongoSchema = mongoose.model('objeto', ObjSchema);
module.exports.JoiSchema = JoiSchema;
