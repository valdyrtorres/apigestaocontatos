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

describe("Teste apiBackend apistarwars POST /contatos",function(){
  this.timeout(15000);

  it("1 - Teste adicionar um contato com /apigestaocontatos/contatos",function(done){
    server.post('/')
    .send({
      nome : 'Angelina Jolie',
      canal : 'novo canal',
      valor : '1000',
      obs: 'Filme TombRaider'
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('Contatos adicionado!');
      done();
    });
  });

});

describe("Teste apiBackend apigestaocontatos GET",function(){
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
    it("3 - Buscar contato por nome. Ex: Buscar contato Angelina Jolie",function(done){
      request.get(
        {
          url : urlBase + "/Angelina Jolie" 
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
            expect(_body[0].nome).to.equal('Angelina Jolie');
          }

          if(_body[0].should.have.property('_id')){
            idPlaneta = _body[0]._id;
          }
  
          done(); 
        }
      );
    });

    // Teste buscar contato por id
    it("4 - Buscar contato por id. Ex: Buscar pelo id do contato AngelinaJolie",function(done){
      request.get(
        {
          url : urlBase + "/buscaporid/" + idContato 
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
  it("5 - Deletar contato por id. Ex: Deletar pelo id do contato Angelina Jolie",function(done){
    server.delete('/' + idContato).end(function(error, res) {
      if (error) {
        throw error;
      }
      expect(res.statusCode).to.equal(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('Contato excluído!');
      done();
    });
  });

});
