const express = require('express');
const app = express();
const port = 3000;
var tarefas = {
   
}
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.get('/', (req, res) => {


    res.render('index', { tarefas });

});
app.get('/tarefas', (req, res) => {
    console.log(req.query.status);
    
    if (req.query.status===undefined ) {
        
        return res.send(tarefas);
    }
    else if (req.query.status === 'true' || req.query.status == 'false') {
        const status = req.query.status === "true";
        console.log(status);
        let filtro = Object.entries(tarefas)
            .filter(([key, value]) => value.status === status)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
            console.log(filtro);
        return res.send(filtro);
    }
    else if (req.query.status !== 'true' || req.query.status !== 'false') {
        
            return res.send({ERRO: "O valor do status deve ser true ou false"});
    }
    return res.send(tarefas);
});

app.post('/tarefas', (req, res) => {
    console.log(req.query);
    
    let id = req.query.id;
    let tarefa = req.query.tarefa;
    let status = req.query.status === "True"
    if (tarefas[id] == undefined){
        for (let key in tarefas){
            if(tarefas[key].tarefa != tarefa || key === id){
                continue;
            }
            else{
                console.log("ERRO: Id ou nome de tarefa já existente já existe");
                
                return res.status(400).json({ERRO: "Este nome de tarefas já existe"});  
                
               
            }  
           
        }
        tarefas[id] = {tarefa, status};
        console.log(tarefa,status);
        return res.status(200).json({SUCCESS: "Tarefa inserida com sucesso !" });}
    else if (tarefas[id] != undefined){
        console.log("ERRO: Tarefa já existe");
        
        return res.status(400).json({ERRO: "Esta tarefa já existe"});  
    }
});

app.put('/tarefas/:id', (req, res) => {
    let id = req.params.id;
    let tarefa = req.query.tarefa;
    let status = Boolean(req.query.status) || false;
    if (tarefas[id] == undefined){
        res.status(400).json({ERRO: "Tarefa não existe"});
    }
    else{
        for (let key in tarefas){
            if(tarefas[key].tarefa != tarefa){
                continue;
            }
            else{
                console.log("ERRO: Este nome de tarefa já existe");
                return res.status(400).json({ERRO: "Este nome de tarefas já existe"});  
            }  
        }
        tarefas[id] = {tarefa, status};
        return res.status(200).json({SUCCESS: "Tarefa atualizada com sucesso"}); 
    }
});
app.delete('/tarefas/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    
    if (tarefas[id] == undefined){
        return res.status(400).json({ERRO: "Tarefa não existe"});
    }
    else{
        delete tarefas[id];
        return res.status(200).json({SUCCESS: "Tarefa deletada com sucesso"}); 
    }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});