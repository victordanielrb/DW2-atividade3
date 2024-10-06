const express = require('express');
const app = express();
const port = 3000;
var tarefas = {
   
}


app.get('/tarefas', (req, res) => {
    if (req.query.status === 'true' || req.query.status === 'false') {
        let status = req.query.status === 'true';
        let filtro = Object.entries(tarefas)
            .filter(([key, value]) => value.status === status)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        return res.send(filtro);
    }
    else if (req.query.status != undefined && req.query.status !== 'true' || req.query.status !== 'false' ) {
        return res.send("ERRO: O valor do status deve ser true ou false");
    }
    return res.send(tarefas);
});

app.post('/tarefas', (req, res) => {
    let id = req.query.id;
    let tarefa = req.query.tarefa;
    let status = Boolean(req.query.status) || false;
    if (tarefas[id] == undefined){
        for (let key in tarefas){
            if(tarefas[key].tarefa != tarefa){
                continue;
            }
            else{
                console.log("ERRO: Este nome de tarefa já existe");
                
                return res.send("ERRO: Este nome de tarefas já existe");  
                
               
            }  
           
        }
        tarefas[id] = {tarefa, status};
        return res.send("Tarefa inserida com sucesso");}
    else{
        return res.send("ERRO: Tarefa já existe");
    }
});

app.put('/tarefas/:id', (req, res) => {
    let id = req.params.id;
    let tarefa = req.query.tarefa;
    let status = Boolean(req.query.status) || false;
    if (tarefas[id] == undefined){
        res.send("ERRO: Tarefa não existe");
    }
    else{
        for (let key in tarefas){
            if(tarefas[key].tarefa != tarefa){
                continue;
            }
            else{
                console.log("ERRO: Este nome de tarefa já existe");
                
                return res.send("ERRO: Este nome de tarefas já existe");  
                
               
            }  
           
        }
        tarefas[id] = {tarefa, status};
        return res.send("Tarefa atualizada com sucesso");
    }
});
app.delete('/tarefas/:id', (req, res) => {
    let id = req.params.id;
    
    
    if (tarefas[id] == undefined){
        return res.send("ERRO: Tarefa não existe");
    }
    else{
        delete tarefas[id];
        return res.send("Tarefa deletada com sucesso");
    }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});