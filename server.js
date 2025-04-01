const express = require ("express");
const app = express();
const data = require("./data.json")

// Verbos HTTP
// GET -> Receber dados de um Resource.
// POST -> Envia dados ou informções para serem processados por um Resource.
// PUT -> Atualiza os dados de um Resource.
// DELETE -> Deleta um Resource. 

app.use(express.json());

app.get("/clients", function(request, response){
    response.json(data);
});

app.get("/clients/:id", function(request, response){
    const { id } = request.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return response.status(404).json({ error: "Cliente não encontrado" });
    response.json(client);
});


app.post("/clients", function(request, response){   
    const { name, email } = request.body;

    response.json({name, email});
})


app.put("/clients/:id", function(request, response){
    const { id } = request.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return response.status(404).json({ error: "Cliente não encontrado" });

    const { name } = request.body;

    client.name = name; 

    response.json(client);
});


app.delete("/clients/:id", function(request, response){
    const { id } = request.params;
    const clientsFiltered = data.filter(client => client.id != id)


    response.json(clientsFiltered);

});


app.listen(3000, function(){
    console.log("Server is running");
});

