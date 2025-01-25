import { Check, Edit, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EDIT_ROUTE } from '../App';
import { TodoApi } from '../service/todoApi';

export default function Task({ task, deleteTask, index }) {
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate()

  const handleDelete = () => {
    setLoading(true)
    TodoApi.deleteTodo(task?._id)
    .then(res => {
        deleteTask(task?._id)
        setShowDeleteConfirmation(false);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  };

  const handleEdit = id => navigate(EDIT_ROUTE + id)

  return (
    <div className="task">
      <div className="task-header">
        <b>{task.titre}</b>
        <div className="task-actions">
          <Edit
            className="icon edit"
            onClick={() => handleEdit(task?._id)}
            size={20}
          />
          <Trash2
            className="icon delete"
            onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
            size={20}
          />
        </div>
      </div>
      <div className="task-description">
        <p>{task.description}</p>
      </div>
      <div className="task-status" data-status={task.status}>
        <span>{task.status}</span>
      </div>

      {/* Delete Confirmation Section */}
      <div className={`delete-confirmation ${showDeleteConfirmation ? 'open' : ''}`}>
        <p>Êtes-vous sûr de vouloir supprimer la tâche <b>{task?.titre}</b> ?</p>
        <div className="delete-confirmation-actions">
          <button
            className="cancel-button"
            disabled={loading}
            onClick={() => setShowDeleteConfirmation(false)}
          >
            <X size={16} /> Annuler
          </button>
          <button
            className="confirm-button"
            disabled={loading}
            onClick={handleDelete}
          >
            <Check size={16} /> Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}