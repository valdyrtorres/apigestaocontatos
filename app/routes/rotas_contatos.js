// routes/rotas_contatos.js
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();

router.get('/', function(req, res, next) {
    res.send('Bem-vindo a ApiGestaoContatos!');
});

// rota: /authenticate: http://localhost:8000/apigestaocontatos/authenticate
router.post('/authenticate', function(req, res) {
    var Usuario = require('../models/usuario');
    
    // busca o usuário
    Usuario.findOne({
       nome: req.body.nome 
    }, function(error, usuario) {
        if(error)
            throw error;

        if(!usuario) {
            res.status(401);
            res.json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
        } else if (usuario) {

            //Aqui iremos verificar se a senha bate com o que está cadastrado no banco:
            if(usuario.senha != req.body.senha) {
                res.status(401);
                res.json({ success: false, message: 'Autenticação do Usuário falhou. Senha incorreta!' });
            } else {
                // caso a senha do usuário seja encontrada.... iremos criar um token:
                //var token = jwt.sign(usuario, app.get('superNode-auth'), {
                //    expiresIn: 1440*60 //o token irá expirar em 24 horas
                //});

                var token = jwt.sign(usuario, '123456', {
                    expiresIn: 60 * 24 // expires in 24 hours
                });

                //Aqui iremos retornar a informação do token via JSON:
                res.status(200);
                res.json({
                    success: true,
                    message: 'Token criado!!!',
                    token: token
                });
            }
        }
    });
});

// rota middleware para poder verificar e autenticar o token
router.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        //jwt.verify(token, app.get('superNode-auth'), function(err, decoded) {   
        jwt.verify(token, '123456', function(err, decoded) {   
            if (err) {
                res.status(401);
                return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });    
            } else {
            //se tudo correr bem, salver a requisição para o uso em outras rotas
            req.decoded = decoded;    
            next();
            }
        });

        } else {
        // se não tiver o token, retornar o erro 403
        return res.status(403).send({ 
            success: false, 
            message: 'Não há token.' 
        });       
    }
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