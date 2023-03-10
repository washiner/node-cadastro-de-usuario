- Query params -> http://localhost:3000/produto?nome=washiner  // FILTROS
se tiver mais nomes coloca & comercial http://localhost:3000/produto?nome=washiner&hellen

app.get('/produto', function(request, response){

    let name = request.query["nome"]

    if(name){
        response.send(name)
    }else{
        response.send("Nenhum nome foi passado !")
    }
})

- - assim tambem busca na url http://localhost:3000/produto?name=washiner&age=43
app.get('/produto', (request, response) =>{

    let name = request.query.name
    let age = request.query.age

    console.log(name,age)

    return response.send("hello express")
})

--

app.get('/produto', (request, response) =>{

    let name = request.query.name
    let age = request.query.age

    console.log(name,age)

    //return response.send("hello express")   // voce pode usar assim mas o certo seria retornar um json

    //return response.json({name:name, age:age})   //o json retorna um array[] ou um objeto {} basta vc escolher
                         //quando a chave tem o mesmo nome do valor pode deixar so um
                         return response.json({name,age})

})

-- existe um jeito melhor ainda de fazer do que o jeito acima
-> essa forma abaixo se chama Destructuring assignment

app.get('/produto', (request, response) =>{

    const {name, age} = request.query  // Destructuring assignment

    console.log(name,age)

    return response.json({name, age})

})


- e pra finalizar no insomnia vc pode usar o query no campo query so estou deixando aqui pra poder ir la depois e relembrar nao tem como eu colar aqui

/* ------------------ */

- finalizamos a aula de query params aqui e abaixo comeca a aula de route params -


- Route params  -> /users/2     //BUSCAR, DELETAR, OU ATUALIZAR ALGO ESPECIFICO 

app.get('/users/:id', (request, response) => { // esse  :id significa que ele vai pegar especificamente o id 

    const {id} = request.params

    console.log(request)

    response.send("Hello Washiner")

})

app.listen(3000, () => {
    console.log(`🚀Server aticved in port:${port}`)
})

- no final para retornar o id no seu console.log

app.get('/users/:id', (request, response) => {

    const {id} = request.params

    console.log(id)

    response.send("Hello Washiner")

})

app.listen(3000, () => {
    console.log(`🚀Server aticved in port:${port}`)
})

-- AULA AGORA E DE REQUEST BODY -> {"name":"washiner", "idade": 43}

- o codigo abaixo traz no console log os dados da url get do insomnia name,age

app.get('/users', (request, response) => {

    console.log(request.body)

   return response.json({message:"ok"})

})

app.listen(3000, () => {
    console.log(`🚀Server aticved in port:${port}`)
})

-- seguindo o codigo acima tem a destructuring que e desistruturacao do codigo pra ficar mais limpo e facil entendimento veja abaixo:

app.use(express.json())  // tem que avisar o node e o express que vamos trabalhar com padrao json mas temos outros padroes o xml por exemplo
                         //sempre vem antes das nossas rotas


app.get('/users', (request, response) => {

    const {name,age} = request.body

   return response.json({name, age})

})

-- fim --

- projeto node -

GET     ->> BUSCAR INFORMACOES NO BACKEND
POST    ->> CRIAR INFORMACOES NO BACKEND
PUT     ->> ALTERAR/ATUALIZAR INFORMACOES NO BACKEND
DELETE  ->> DELETAR INFORMACOES NO BACKEND


- Agora vamos criar uma rota para criar usuario ou seja POST
- para isso temos que instalar o pacote uuid para gerar um id randomigo 
- npm install uuid

- ate aqui aula 18 criamos o get e o post como vemos no codigo abaixo onde ele cria novos usuarios com seus respectivos ids e mostra todos via insomnia

const { query } = require("express");
const express = require("express");
const uuid = require("uuid");
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});



app.listen(3000, () => {
  console.log(`🚀Server aticved in port:${port}`);
});

-- apartir daqui vamos criar o put para atualizar os dados --

- para buscar um usuario para atualizar ele o melhor jeito de buscar ele e pelo route params

- para buscar um usuario no array de usuario vc pode usar o filter ou find ou findIndex

-buscar um findIndex tem que percorrer um array nome qualquer exemplo new_user inteirando item por item do array com esse simbolo => new.user.id e === id


-     const index = users.findIndex(user => user === id)  // cria uma variavel index chama array pelo index da um nome user => percorre item por item ate achar user ===id que for igual o id que estamos procurando
- o findIndex quando ele nao encontra nada ele retorna um -1 se vc der no console.log vc consegue ver

const index = users.findIndex(user => user === id)
console.log(index)

- BOM ATE AQUI E SO TESTE PARA VER SE ELE BUSCA NO CONSOLE CODIGO TODO

app.put("/users/:id", (request, response) => {

    const {id} = request.params // vai la no array e busca o id
    const {name, age} = request.body //vai busca o nome e idade do usuario busca pelo body

    const userUpdate = {id, name, age} //ai cria o novo usuario para atualizar

    const index = users.findIndex(user => user === id)  // cria uma variavel index chama array pelo index da um nome user => percorre item por item ate achar user ===id que for igual o id que estamos procurando

    console.log(index)

    return response.json(users);
  });

  - NESTA AULA ELE JA ESTA BUSCANDO O ID PELA URL LA NO INSOMNIA

  app.put("/users/:id", (request, response) => {

    const {id} = request.params
    const {name, age} = request.body

    const userUpdate = {id, name, age}

    const index = users.findIndex(user => user.id === id)
    console.log(index)

    return response.json(users);
  });

  - AULA DO PUT FINALIZADA CODIGO ABAIXO

  app.put("/users/:id", (request, response) => {

    const {id} = request.params
    const {name, age} = request.body

    const userUpdate = {id, name, age}

    const index = users.findIndex(user => user.id === id)

        if(index < 0){ // findIndex se nao encontra nada ele retorna -1 por isso if colocamos < 0
           return response.status(404).json({message:"Usuário nao encontrado"})
        }
     //atualizar o array depois da verificacao pega o index da lista de usuario e coloca no novo usuario
        users[index] = userUpdate
    //console.log(index)

    return response.json(userUpdate);  // ai retorna o usuario atualizado
  });

  -- AGORA VAMOS CRIAR O DELET

  - cria uma rota do tipo delete e como no update buscar por /:id que é oque esta na url vindo da aplicacao

  - O método splice () é usado para adicionar ou remover itens de um array e, em seguida, retornar o item removido. O primeiro argumento especifica a posição da matriz para inserção ou exclusão, enquanto o segundo argumento da opção indica o número de elementos a serem excluídos.

  - CODIGO FINAL DO DELETE ABAIXO -
   app.delete("/users/:id", (request, response) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "Usuario nao existe"})
    }

    users.splice(index,1)  // splice deleta itens de um array com dois argumentos posicao do array ou seja index segundo argumento e quantos elementos vao ser excluido


    return response.status(204).json()
  });

-- FINALIZANDO AQUI SEM O MIDDLEWARE
