/**
 * Teste de api para apigestaocontatos
 * A API utilizada neste projeto eh
 * @see http://localhost:8000/
 *
 */

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var supertest = require("supertest");
var urlBase = "http://localhost:8000/apigestaocontatos/contatos";
var server = supertest.agent(urlBase);
var idContato = "";

describe("Teste apigestaocontatos POST /contatos",function(){
  this.timeout(15000);

  it("1 - Teste adicionar um contato com /apigestaocontatos/contatos",function(done){
    server.post('/')
    .send({
      nome : 'Camila Pitanga',
      canal : 'email',
      valor : '1000',
      obs: 'Estrelou novela Velho Chico'
    })
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

describe("Teste apigestaocontatos GET",function(){
    this.timeout(15000);

    // Teste lista contatos
    it("2 - Teste listar contatos",function(done){
      request.get(
        {
          url : urlBase + "/"
        },
        function(error, response, body){
  
          // precisamos converter o retorno para um objeto json
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }
  
          // sucesso ==> 200
          expect(response.statusCode).to.equal(200);
          
          done(); 
        }
      );
    });
  
    // Teste buscar contato por nome
    it("3 - Buscar contato por nome. Ex: Buscar contato Camila Pitanga",function(done){
      request.get(
        {
          url : urlBase + "/busca=Camila Pitanga" 
        },
        function(error, response, body){
  
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }
  
          // sucesso ==> 200
          expect(response.statusCode).to.equal(200);
  
          if(_body[0].should.have.property('nome')){
            expect(_body[0].nome).to.equal('Camila Pitanga');
          }

          if(_body[0].should.have.property('_id')){
            idContato = _body[0]._id;
          }
  
          done(); 
        }
      );
    });

    // Teste buscar contato por id
    it("4 - Buscar contato por id. Ex: Buscar pelo id do contato Camila Pitanga",function(done){
      request.get(
        {
          url : urlBase + "/" + idContato 
        },
        function(error, response, body){
  
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }
  
          // sucesso ==> 200
          expect(response.statusCode).to.equal(200);

          // Porque espera-se o mesmo nome, pois foi o id criado no teste anterior
          if(_body.should.have.property('_id')){
            expect(_body._id).to.equal(idContato);
          }
  
          done(); 
        }
      );
    });
});    

describe("Teste apigestaocontatos DELETE /contatos",function(){
  this.timeout(15000);

  // Teste deletar contato por id
  it("5 - Deletar contato por id. Ex: Deletar pelo id do contato Camila Pitanga",function(done){
    server.delete('/' + idContato).end(function(error, res) {
      if (error) {
        throw error;
      }
      expect(res.statusCode).to.equal(204);
      done();
    });
  });

});
