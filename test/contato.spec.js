/**
 * Teste de api para apigestaocontatos
 * A API utilizada neste projeto eh
 * @see http://localhost:8000/
 *
 */

var should = require("should");
var assert = require('assert');
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var supertest = require("supertest");
var urlBase = "http://localhost:8000/apigestaocontatos";
var server = supertest.agent(urlBase);
var idContato = "";
var token = "";

describe("Teste apigestaocontatos POST /contatos",function(){
  this.timeout(15000);
  before(function(done) {
    server.post('/authenticate/')
      .send({
        nome: 'Valdir Torres',
        senha: '1234567'
      })
      .end(function(err, res) {
        if (err) throw err;
        token =  res.body.token;
        console.log("token:" + token);
        done();
      });
  });

  it("1 - Teste adicionar um contato com /apigestaocontatos/contatos",function(done){
    server.post('/contatos/')
    .send({
      nome : 'Camila Pitanga',
      canal : 'email',
      valor : '1000',
      obs: 'Estrelou novela Velho Chico'
    })
    .set('x-access-token', token)
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.should.have.property('message');
      res.body.message.should.equal('Contato adicionado!');
      done();
    });
  });

});

describe("Teste apigestaocontatos GET", function() {
  it("2 - Teste listar contatos", function(done) {
      server
          .get('/contatos/')
          .set('x-access-token', token)
          .expect(200, done);
  });
});

describe("Teste apigestaocontatos GET",function(){
    this.timeout(15000);

    it("3 - Buscar contato por nome. Ex: Buscar contato Camila Pitanga", function(done) {
       server
         .get('/contatos/busca=Camila Pitanga')
         .set('x-access-token', token)
         .end(function(err, result) {
             assert.equal(result.statusCode, 200);
             assert.equal(result.body[0].nome, 'Camila Pitanga');
             idContato = result.body[0]._id;
             done();
         });
    });

    // Teste buscar contato por id
    it("4 - Buscar contato por id. Ex: Buscar pelo id do contato Camila Pitanga",function(done){

      server
        .get('/contatos/' + idContato)
        .set('x-access-token', token)
        .end(function(err, result) {
            assert.equal(result.statusCode, 200);
            assert.equal(result.body._id, idContato);
            assert.equal(result.body.nome, 'Camila Pitanga');
            done();
      });

    });
});    

describe("Teste apigestaocontatos DELETE /contatos",function(){
  this.timeout(15000);

  it("5 - Deletar contato por id. Ex: Deletar pelo id do contato Camila Pitanga", function(done) {
    server
        .delete('/contatos/' + idContato)
        .set('x-access-token', token)
        .expect(204, done);
  });

});
