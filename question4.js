const express = require('express');  
const app = express();  
const port = 3000;  

app.use(express.json());  


let tasks = [];  
let nextId = 1; 

  
app.post('/tasks', (req, res) => {  
  const { name, description } = req.body;  
  const newTask = { id: nextId++, name, description };  
  tasks.push(newTask);  
  res.status(201).json(newTask);  
});  

 
app.get('/tasks', (req, res) => {  
  res.json(tasks);  
});  

  
app.put('/tasks/:id', (req, res) => {  
  const taskId = parseInt(req.params.id);  
  const { name, description } = req.body;  
  const task = tasks.find(t => t.id === taskId);  

  if (!task) {  
    return res.status(404).json({ message: 'Task not found' });  
  }  

  task.name = name !== undefined ? name : task.name;  
  task.description = description !== undefined ? description : task.description;  
  res.json(task);  
});  

 
app.delete('/tasks/:id', (req, res) => {  
  const taskId = parseInt(req.params.id);  
  const taskIndex = tasks.findIndex(t => t.id === taskId);  

  if (taskIndex === -1) {  
    return res.status(404).json({ message: 'Task not found' });  
  }  

  tasks.splice(taskIndex, 1);  
  res.status(204).send();  
});  
 
app.listen(port, () => {  
  console.log(Server listening at http://localhost:${port});  
});  
