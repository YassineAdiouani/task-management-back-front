const Tasks = require('../models/tasks.model');

module.exports = {
    index: async (req, res, next) => {
        try {
            const tasks = await Tasks.find();
            res.status(200).json({ tasks });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Internal server error: " + err.message });
        }
    },
    store: async (req, res, next) => {
        try {
            const task = new Tasks(req.body);
            await task.save();
            res.status(201).json({ message: 'Task created successfully', task });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ 
                errors: {
                    titre: err.errors.titre?.properties.message,
                    description: err.errors.description?.properties.message,
                    status: err.errors.status?.properties.message
                },
                message: "Internal server error: " + err.message });
        }
    },
    show: async (req, res, next) => {
        try {
            const task = await Tasks.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ task });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Internal server error: " + err.message });
        }
    },
    update: async (req, res, next) => {
        try {
            const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task updated successfully', task });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ 
                errors: {
                    titre: err.errors.titre?.properties.message,
                    description: err.errors.description?.properties.message,
                    status: err.errors.status?.properties.message
                },
                message: "Internal server error: " + err.message });
        }
    },
    destroy: async (req, res, next) => {
        try {
            const task = await Tasks.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Internal server error: " + err.message });
        }
    },
}
