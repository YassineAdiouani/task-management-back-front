const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks.controller');

// fetch Tasks
router.get('/', tasksController?.index);
// add Tasks
router.post('/', tasksController?.store);
// get Task
router.get('/:id', tasksController?.show);
// update Tasks
router.put('/:id', tasksController?.update);
// distroy Tasks
router.delete('/:id', tasksController?.destroy)

module.exports = router;