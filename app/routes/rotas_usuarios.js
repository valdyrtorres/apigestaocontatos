// routes/rotas_contatos.js
var express = require('express');
var adminRoutes = express.Router();
var Usuario = require('../models/usuario'); // classe de modelo 'Usuario'

adminRoutes.get('/admin', function(req, res, next) {
    res.send('Bem-vindo a api de administração!');
});

// Rota para retornar todos os usuários: GET: http://localhost:8000/apigestaocontatosadmin/usuarios
adminRoutes.get('/usuarios', function(req, res){
    Usuario.find({}, function(error, usuarios){
        res.json(usuarios);
    });
});

// Em uma aplicação de produção, essa rota deve ser protegida, como é
// uma aplicativo em desenvolvimento, é disponibilizado para cria um
// usuário de admin para receber o token e poder utilizar todos os verbos
// para manipulação dos contatos
adminRoutes.get('/criarusuario', function(req, res){
    //Aqui iremos criar um usuário de exemplo - todas as vezes que formos usar essa rota aparecerá esse usuário
    var usuarioExemplo = new Usuario({
        nome: 'Valdir Torres',
        senha: '1234567',
        admin: true
    });

    //Aqui estaremos salvando esse usuário de exemplo:
    usuarioExemplo.save(function(error) {
        if(error)
            throw error;

        console.log('Usuário Criado com Sucesso!');
            res.json({
               success: true 
            });
    });
});

module.exports = adminRoutes;