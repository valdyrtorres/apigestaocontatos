apibackend criado por Valdir Torres
Raiz do projeto ==> /apigestaocontatos


Modelo de dados:


Mongo (nosql)


Tabela Contato

ID: int

Nome: String

Canal: String

Valor: String

Obs: String

host da api: http://localhost:8000

Uso da apigestaocontatos:

/apigestaocontatos/contatos        POST	Adicionar um contato

Ex: http://localhost:8000/apigestaocontatos/contatos

Obs.: Caso o use o Postman marcar a opção x-www-form-urlencoded

/apigestaocontatos/contatos	            GET	    Listar todos os contatos do banco

Ex: http://localhost:8000/apigestaocontatos/contatos


/apigestaocontatos/contatos/:nome	        GET	    Buscar por nome de contato

Ex: http://localhost:8000/apigestaocontatos/contatos/Angelina Jolie


/apigestaocontatos/contatos/buscarporid/:contato_id	    GET	    Buscar por Id 

Ex: http://localhost:8000/apigestaocontatos/contatos/buscarporid/5b0b43e43258ac452480b279


/apigestaocontatos/contatos/:contato_id	    DELETE	Remover contato por Id

Ex: http://localhost:8000/apigestaocontatos/contatos/5b0b43e43258ac452480b279


/apigestaocontatos/contatos/:contato_id	    PUT	    Atualizar contato por Id

Ex: http://localhost:8000/apigestaocontatos/contatos/5b0b60fb72e2982848f56784

Obs.: Caso o use o Postman marcar a opção x-www-form-urlencoded


Para executar a aplicação npm run dev: 

Exemplo:
cd C:\apigestaocontatos
C:\apigestaocontatos> npm run dev 

obs.: Pode usar o comando node server.js também


Iniciar o mongo:

mongod --dbpath {PROJECT_PATH}\data

Ex: mongod --dbpath C:\projeto\data

Obs: O projeto funciona bem com uma base zerada também

Abrir a página da ApiStarWars:
http://localhost:8000/apigestaocontatos

Testes:

Antes de tudo, caso não tenha os pacotes mocha, chai, should e supertest instalados, aplique na raiz do projeto:
npm install mocha -g --save-dev
npm install chai --save-dev
npm install should --save-dev
npm install supertest --save-dev

Na raiz do projeto (/apigestaocontatos por exemplo), digite mocha, pois vai testar tudo que está contido
no arquivo contato.spec.js dentro do diretório test.

Exemplo:
cd C:\apigestaocontatos
C:\apigestaocontatos> mocha

Resultados esperados:

  Teste apiBackend apigestaocontatos POST /contatos
    √ 1 - Teste adicionar um planeta com /apigestaocontatos/contatos

  Teste apiBackend apigestaocontatos GET
    √ 2 - Teste listar contatos
    √ 3 - Buscar contato por nome. Ex: Buscar o contato Angelina Jolie 
    √ 4 - Buscar contato por id. Ex: Buscar pelo id do contato Angelina Jolie

  Teste apiBackend apistarwars DELETE /contatos
    √ 5 - Deletar contato por id. Ex: Deletar pelo id do contato Angelina Jolie


  5 passing (2s)
