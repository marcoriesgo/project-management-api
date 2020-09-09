const express = require("express");
const router = express.Router();


// Get Todo model
const Todo = require("../../models/Todo");

router.post('/create', async (req, res) => {
    Todo.create(req.body, (error, createdTodo) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdTodo) 
    })
})

router.get('/:id', (req, res) => {
    Todo.find({ userId: req.params.id })
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedTodo)
    })
})

router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedTodo)
    })
})


module.exports = router;