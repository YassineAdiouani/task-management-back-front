import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoApi } from '../service/todoApi';
import { HOME_ROUTE } from '../App';

const EditTask = ({ tasks, setTasks, fetchData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    titre: '',
    description: '',
    status: 'À faire',
  });

  useEffect(() => {
    setLoading(true);
    TodoApi.getTodoById(id)
      .then((res) => {
        setTask(res.data?.task);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const FieldInput = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    TodoApi.updateTodo(task)
      .then((res) => {
        setTasks(tasks.map(t => task._id === id ? res.data?.task : task));
        fetchData();
        navigate(HOME_ROUTE);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="add-task-container">
      <div className="form-scrollable">
        <form onSubmit={handleSubmit}>
          {/* Task Message Input */}
          <div className="form-group">
            <label htmlFor="titre">Task Message</label>
            <input
              type="text"
              name="titre"
              value={task.titre}
              onChange={FieldInput}
              disabled={loading}
              required
            />
          </div>

          {/* Task Description Input */}
          <div className="form-group">
            <label htmlFor="description">Task Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={FieldInput}
              disabled={loading}
              required
            />
          </div>

          {/* Status Select */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={FieldInput}
              disabled={loading}
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        Update Task
      </button>
    </div>
  );
};

export default EditTask;