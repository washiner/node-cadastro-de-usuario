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

app.put("/users/:id", (request, response) => {

    const {id} = request.params
    const {name, age} = request.body

    const userUpdate = {id, name, age}

    const index = users.findIndex(user => user.id === id)

        if(index < 0){ 
           return response.status(404).json({message:"Usuário nao encontrado"})
        }
        users[index] = userUpdate

    return response.json(userUpdate); 
  });

  app.delete("/users/:id", (request, response) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "Usuario nao existe"})
    }

    users.splice(index,1)

    return response.status(204).json()
  });

app.listen(3000, () => {
  console.log(`🚀Server aticved in port:${port}`);
});
