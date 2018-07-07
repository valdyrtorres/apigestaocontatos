/*
* Arquivo: contato.js
* Author:  Valdir Torres
* Descrição: arquivo com o modelo da classe Contato
* Data: 09/07/2018
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contatos');

/*
*  Classe Contato
*  ID: int
*  Nome: String
*  canal: String
*  valor: String
*  obs: String
*  Nota: o ID já é inerente ao document do mongo */
var contatoSchema = new mongoose.Schema({
    nome: String,
    canal: String,
    valor: String,
    obs: String
}, { collection: 'Contatos' }
);

module.exports = { Mongoose: mongoose, ContatoSchema: contatoSchema }