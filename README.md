<h1>apigestaocontatos criado por Valdir Torres</h1>
Raiz do projeto ==> /apigestaocontatos

<p>Modelo de dados:


Mongo (nosql)


Tabela Contato

ID: int

Nome: String

Canal: String

Valor: String

Obs: String</p>
<br/>
<h2>host da api: http://localhost:8000</h2>

<h3>Uso da apigestaocontatos:</h3>
<hr>
Iniciar o mongo:
mongod --dbpath {PROJECT_PATH}\data
Ex: mongod --dbpath C:\projeto\data
Obs: O projeto funciona bem com uma base zerada também
<hr>
<h4>Para executar a aplicação npm run dev: </h4>
Exemplo:
cd C:\apigestaocontatos
C:\apigestaocontatos> npm run dev 
obs.: Pode usar o comando node server.js também 
<hr>
Abrir a página da apigestaocontatos:
http://localhost:8000/apigestaocontatos
<hr>
A) A utilização da rotas e seus verbos estão protegidas por autenticação, desse modo para acessá-las é 
necessário criar um usuário de testes, basta fazer o GET apenas uma vez para criar o usuário:
http://localhost:8000/apigestaocontatosadmin/criarusuario
Essa rota está liberada (fora da autenticação) vai criar o usuário de testes 'Valdir Torres' e senha 1234567

Esse usuário é necessário para conseguir o token no passo seguinte
<hr>
B) Conseguindo o token
Caso utilize o postman acesse: (rota liberada)
B.1) http://localhost:8000/apigestaocontatos/authenticate e escolha 'POST' 
B.2) na aba 'Body' escolha a opção raw e no corpo ponha:
{
	"nome" : "Valdir Torres",
	"senha": "1234567"
}

Obs: Funciona se escolher o modo de formulário. Marque a opção x-www-form-urlencoded e crie
os parâmetros nome e senha e preencha respectivamente com Valdir Torres e 1234567
<br>

B.3) Clique no botão "Send"
Resposta esperada:
{
    "success": true,
    "message": "Token criado!!!",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWI0MmQ4MjQ1M2MwNTkwN2I4OWZjNzNmIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsIm5vbWUiOiJpbml0Iiwic2VuaGEiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJub21lIjp0cnVlLCJzZW5oYSI6dHJ1ZSwiYWRtaW4iOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH0sIiRvcHRpb25zIjp7InNraXBJZCI6dHJ1ZSwiaXNOZXciOmZhbHNlLCJza2lwRGVmYXVsdHMiOnsiX2lkIjp0cnVlLCJub21lIjp0cnVlLCJzZW5oYSI6dHJ1ZSwiYWRtaW4iOnRydWUsIl9fdiI6dHJ1ZX19fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjViNDJkODI0NTNjMDU5MDdiODlmYzczZiIsIm5vbWUiOiJWYWxkaXIgVG9ycmVzIiwic2VuaGEiOiIxMjM0NTY3IiwiYWRtaW4iOnRydWUsIl9fdiI6MH0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MzExODM2MzksImV4cCI6MTUzMTE4NTA3OX0.Ms2N65MTVsUXeG451fAH08_L3sSeCuF3FOFPtsmKmhk"
}
<br>

De agora em diante use esse token. Para utilizá-lo no postman, preencha no header o seguinte:
Em Key: x-access-token
Em Value: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWI0MmQ4MjQ1M2MwNTkwN2I4OWZjNzNmIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsIm5vbWUiOiJpbml0Iiwic2VuaGEiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJub21lIjp0cnVlLCJzZW5oYSI6dHJ1ZSwiYWRtaW4iOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH0sIiRvcHRpb25zIjp7InNraXBJZCI6dHJ1ZSwiaXNOZXciOmZhbHNlLCJza2lwRGVmYXVsdHMiOnsiX2lkIjp0cnVlLCJub21lIjp0cnVlLCJzZW5oYSI6dHJ1ZSwiYWRtaW4iOnRydWUsIl9fdiI6dHJ1ZX19fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjViNDJkODI0NTNjMDU5MDdiODlmYzczZiIsIm5vbWUiOiJWYWxkaXIgVG9ycmVzIiwic2VuaGEiOiIxMjM0NTY3IiwiYWRtaW4iOnRydWUsIl9fdiI6MH0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MzExODM2MzksImV4cCI6MTUzMTE4NTA3OX0.Ms2N65MTVsUXeG451fAH08_L3sSeCuF3FOFPtsmKmhk


<hr>
Obs: Use o token para se autenticar preenchendo o header
<h5>/apigestaocontatos/contatos        POST	Adicionar um contato</h5>

Ex: http://localhost:8000/apigestaocontatos/contatos

Obs.: Caso o use o Postman, pona na aba "Body" o seguinte json:
{
        "nome": "Angelina Jolie",
        "canal": "outro canal",
        "valor": "500",
        "obs": "Estrelou o filme Tomb Raider"
}

marque a opção "raw" e "JSON(application/json)", depois clique no botão "Send".

Resultado esperado:
{
    "message": "Contato adicionado!"
}

<hr>

<h5>/apigestaocontatos/contatos	            GET	    Listar todos os contatos do banco</h5>

Ex: http://localhost:8000/apigestaocontatos/contatos<br/> 
ou<br>
http://localhost:8000/apigestaocontatos/contatos?page=1&size=2<br>
Obs: Caso nem page nem size sejam fornecidos, os valores padrões são page=1 e size=10
Resultado esperado:
\[
    {
        "_id": "5b40fc32943abb2fc4c54aec",
        "nome": "Angelina Jolie",
        "canal": "novo canal",
        "valor": "1000",
        "obs": "Estrelou o filme Tomb Raider",
        "__v": 0
    },
    {
        "_id": "5b40fe43eb60b810c0eee901",
        "nome": "Ralph Macchio",
        "canal": "outro canal",
        "valor": "500",
        "obs": "Estrelou o filme Karate Kid",
        "__v": 0
    }
\]
<hr>
<h5>/apigestaocontatos/contatos/:nome	        GET	    Buscar por nome de contato</h5>
Ex: http://localhost:8000/apigestaocontatos/contatos/busca=Ang
Veja que basta por "Ang" que vai listar todos os nomes que tenham Ang em seu conteúdo<br>
Resultado esperado:<br>
\[
    {
        "_id": "5b40fc32943abb2fc4c54aec",
        "nome": "Angelina Jolie",
        "canal": "novo canal",
        "valor": "1000",
        "obs": "Estrelou o filme Tomb Raider",
        "__v": 0
    }
\]
<hr>
<h5>/apigestaocontatos/contatos/buscarporid/:contato_id	    GET	    Buscar por Id </h5>
<br>
Ex: http://localhost:8000/apigestaocontatos/contatos/5b40fc32943abb2fc4c54aec
Resultado esperado:
{
    "_id": "5b40fc32943abb2fc4c54aec",
    "nome": "Angelina Jolie",
    "canal": "novo canal",
    "valor": "1000",
    "obs": "Estrelou o filme Tomb Raider",
    "__v": 0
}
<hr>
<h5>/apigestaocontatos/contatos/:contato_id	    DELETE	Remover contato por Id</h5>
<br>
Ex: http://localhost:8000/apigestaocontatos/contatos/5b413c4b9f15483e54f68311
Resultado esperado:
{
    "message": "Contato excluído!"
}
<hr>
<h5>/apigestaocontatos/contatos/:contato_id	    PUT	    Atualizar contato por Id</h5>
<br>
Ex: http://localhost:8000/apigestaocontatos/contatos/5b0b60fb72e2982848f56784
Obs.: Caso o use o Postman, pona na aba "Body" o seguinte json:
{
        "nome": "Robert Downey Jr",
        "canal": "canal homem de ferro",
        "valor": "2500",
        "obs": "Estrelou o filme Homem de Ferro"
}
marque a opção "raw" e "JSON(application/json)", depois clique no botão "Send".
Resultado esperado:
{
    "message": "Contato atualizado!"
}

<hr>
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
<hr>
Resultados esperados:<br> 
  Teste apigestaocontatos POST /contatos       <br>                                  
  √ 1 - Teste adicionar um contato com /apigestaocontatos/contatos (57ms)    <br>                                                                              
Teste apigestaocontatos GET                   <br>                                  
  √ 2 - Teste listar contatos                 <br>                                  
  √ 3 - Buscar contato por nome. Ex: Buscar contato Camila Pitanga (2007ms)    <br> 
  √ 4 - Buscar contato por id. Ex: Buscar pelo id do contato Camila Pitanga  <br>                                                                                 
Teste apigestaocontatos DELETE /contatos                                      <br>  
  √ 5 - Deletar contato por id. Ex: Deletar pelo id do contato Camila Pitanga  <br> 
<hr>
