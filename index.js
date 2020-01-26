const express = require('express');

const server = express();





server.use(express.json());

const projects = [];

const checkProjectsInArray = (req, res, next) => {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: "Project not exists" });
    }
    next();


}

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);





// mostrar todos os projetos
server.get('/projects/', (req, res) => {
    return res.json(projects)
});

// adcionar projetos

server.post('/projects/', (req, res) => {
    const { title, id } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);
    return res.json(project);

})

// alterar título

server.put('/projects/:id', checkProjectsInArray, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);


    project.title = title;
    return res.json(project);
})


server.delete('/projects/:id',checkProjectsInArray, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
})


// Adcionar tarefa
server.post('/projects/:id/tasks',checkProjectsInArray, (req, res) => {
    const { id } = req.params;
    const { titleTasks } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(titleTasks);

    return res.json(project);

});


server.listen(3333);