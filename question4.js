const express = require('express');  
const app = express();  
const port = 3000;

let tasks = [
  { id: 1, name: 'Task 1', description: 'Description of Task 1' },
  { id: 2, name: 'Task 2', description: 'Description of Task 2' }
];

app.use(express.json()); // Middleware to parse JSON request bodies

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
  console.log(`Server listening at http://localhost:${port}`);  
});
