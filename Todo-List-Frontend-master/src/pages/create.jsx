import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../App';
import { TodoApi } from '../service/todoApi';

const AddTask = ({ tasks, setTasks, fetchData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    titre: '',
    description: '',
    status: 'À faire',
  });

  const FieldInput = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    TodoApi.addTodo(task)
      .then((res) => {
        setTasks([...tasks, res.data]);
        fetchData()
        navigate(HOME_ROUTE);
      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors || {});
      })
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
              className={errors.titre ? 'input-error' : ''}
              required
            />
            {errors.titre && <span className="error-message">{errors.titre}</span>}
          </div>

          {/* Task Description Input */}
          <div className="form-group">
            <label htmlFor="description">Task Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={FieldInput}
              disabled={loading}
              className={errors.description ? 'input-error' : ''}
              required
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Status Select */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={FieldInput}
              disabled={loading}
              className={errors.status ? 'input-error' : ''}
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            {errors.status && <span className="error-message">{errors.status}</span>}
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
        Add Task
      </button>
    </div>
  );
};

export default AddTask;