const express = require("express");
const router = express.Router();


// Get projects model
const Project = require("../../models/Project");

router.post('/create', async (req, res) => {
    Project.findOne({
        name: req.body.name
    })
    .then(project => {
        if (project) {
            res.json("Project by this name already exists")
        } else {
            const newProject = new Project({
                userId: req.body.userId,
                name: req.body.name,
                description: req.body.description
            })
            newProject.save().then(project => res.json(project))
        }
    })
    .catch(err => console.log(err)); // Mongo Error
})

router.get('/:id', (req, res) => {
    Project.find({ userId: req.params.id })
        .then(projects => res.json(projects))
        .catch(err => console.log(err));
})

router.get('/:id/:categoryId', (req, res) => {
    Project.find({ userId: req.params.id, categoryId: req.params.categoryId})
        .then(projects => res.json(projects))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, deletedProject) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedProject)
    })
})

router.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProject) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedProject)
    })
})


module.exports = router;