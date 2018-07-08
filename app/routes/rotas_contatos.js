// routes/rotas_contatos.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Bem-vindo a ApiGestaoContatos!');
});

// 1) Método: Adicionar um contato ==> POST http://localhost:8000/apigestaocontatos/contatos)  
router.post('/contatos', function (req, res) {

    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');
    var contato = new Contatos(req.body);

    contato.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            res.status(400);
            res.send('Erro ao adicionar o Contato....: ' + error);
            return err;
        } else {
            res.status(201);
            res.json({ message: 'Contato adicionado!' });
            console.log("Contato adicionado!");
        }
    });

});    

// 2) Método: Listar contatos ==> GET http://localhost:8000/apigestaocontatos/contatos
//router.get('/contatos', function(req, res) {
router.get('/contatos', function(req, res) {
    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');

    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.size)

    if (isNaN(pageNo)) {
        pageNo = 1;
    }

    if (isNaN(size)) {
        size = 10;
    }

    //console.log("page=" + pageNo)
    //console.log("size=" + size)

    var query = {}
    if(pageNo < 0 || pageNo === 0) {
        res.status(400);
        response = {"error" : true,"message" : "número de página inválido, você deve iniciar com 1"};
        return res.json(response)
    }

    if(size < 0 || size === 0) {
        res.status(400);
        response = {"error" : true,"message" : "size inválido"};
        return res.json(response)
    }
    
    query.skip = size * (pageNo - 1)
    query.limit = size

    Contatos.find({},{},query,function(err,data) {

        if(err) {
            res.status(404);
            response = {"error" : true,"message" : "Erro ao buscar os dados"};
        } else {
            res.status(200);
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });

});

// 3) Método: Buscar contato por nome ==> GET http://localhost:8000/apigestaocontatos/contatos/busca=:contato_nome
router.get('/contatos/busca=:contato_nome', function(req, res) {
    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');
    var query = { nome : { '$regex' : req.params.contato_nome } };

    Contatos.find(query, function (err, contato) {
        if(err) {
           res.status(404);
           res.send('Contato não encontrado:' + err);
        }
        else {
           res.status(200);
           res.json(contato);
        }
    });
    

});

 // 4) Método: Buscar contato por id ==> GET http://localhost:8000/apigestaocontatos/contatos/:contato_id
 router.get('/contatos/:contato_id', function(req, res) {
    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');

    Contatos.findById(req.params.contato_id, function (err, contato) {
       if(err) {
           res.status(404);
           res.send('Contato não encontrado:' + err);
       }
       else  {
           if (contato === null) {
              res.status(404);
              res.send('Contato não encontrado.');
           }
           else {
              res.status(200);
              res.json(contato);
           }
       }
    });

});

 // 5) Método: Remover contato ==> DELETE http://localhost:8000/apigestaocontatos/contatos/:contato_id
 router.delete('/contatos/:contato_id', function(req, res) {
    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');

    Contatos.findById(req.params.contato_id, function (err, contato) {
        if(err) {
            res.status(404);
            res.send('Contato não encontrado:' + err);
        }
        else  {
            if (contato === null) {
               res.status(404);
               res.send('Contato não encontrado.');
            }
            else {
               Contatos.remove({
                _id: req.params.contato_id
                },function(err) {
                    if(err) {
                       res.status(404);
                       res.send('Contato não encontrado:' + err);
                    }
                    else {
                       console.log('Contato excluído!');
                       res.status(204);
                       res.json({ message: 'Contato excluído!' });
                    }
                }
             );
            }
        }
     });

});

// 6) Método: Atualizar contato por id ==> PUT http://localhost:8000/apigestaocontatos/contatos/:contato_id
router.put('/contatos/:contato_id', function(req, res) {
    var db = require("../models/contato");
    var Contatos = db.Mongoose.model('Contatos', db.ContatoSchema, 'Contatos');

    Contatos.findById(req.params.contato_id, function (err, contato) {
       if(err) {
          res.send('Contato não encontrado:' + err);
       }
       else {
          if (contato === null) {
             res.status(204);
             res.send('Contato não existe!');
          }
          else {
             contato.nome = req.body.nome;
             contato.canal = req.body.canal;
             contato.valor = req.body.valor;
             contato.obs = req.body.obs;

             contato.save(function(err) {
                if(err) {
                   res.status(400);
                   res.send('Erro ao atualizar o contato:' + err);
                }
                else {
                    console.log('Contato atualizado!');
                    res.status(204);
                    res.json({ message: 'Contato atualizado!'});
                }
             });
          }
       }

    });

});

module.exports = router;