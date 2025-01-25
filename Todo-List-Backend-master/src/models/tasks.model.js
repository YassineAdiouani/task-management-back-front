const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    titre: { 
        type: String,
        required: [true, 'Le titre est requis'],
        minLength: [3, 'Le titre doit contenir au moins 3 caractères'],
        unique: true,
    },
    description: { 
        type: String,
        required: [true, 'La description est requise'],
        minLength: [10, 'La description doit contenir au moins 10 caractères'],
    },
    status: { 
        type: String,
        enum: {
            values: ['À faire', 'En cours', 'Terminé'],
            message: 'Le statut doit être "À faire", "En cours" ou "Terminé"'
        },
        required: [true, 'Le statut est requis'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);