import React, { useState } from 'react';
import Task from '../components/task';
import TaskSkeleton from '../components/taskSkeleton';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ADD_ROUTE } from '../App';

export default function Home({ tasks, deleteTask, isLoading }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) =>
    task?.titre?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div className="input-container">
        <button disabled={isLoading} onClick={() => navigate(ADD_ROUTE)}>
          <Plus className="plus" />
        </button>
        <input
          disabled={isLoading}
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <hr />
      <div className="taskList">
        {isLoading ? '123'.split('').map(index =>
            <TaskSkeleton key={index} />) : filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              deleteTask={deleteTask}
            />
          ))
        ) : ( // Show a message if there are no tasks
          <div className="task">
            There is no Tasks {searchText.length ? `Under name ${searchText}` : ''}...
          </div>
        )}
      </div>
    </>
  );
}