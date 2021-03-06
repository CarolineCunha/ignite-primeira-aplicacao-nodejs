const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
    const {cpf, name} = request.body;
    const customerAlreadyExists = customers.some((customer) => 
    customer.cpf === cpf);
    if(customerAlreadyExists){
        return response.status(400).json({error: "Customer already exists!"});
    }
    
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statment: []
    });
    return response.status(201).send();
});

app.get("/statement/", (request, response)=> {
    const { cpf } = request.headers;
    if(!customer) {
        return response.status(400).json({error: "Customer not found"});
    }
    const customer = customers.find(customer => customer.cpf === cpf);
    return response.json(customer.statment);
})

app.listen(3333);