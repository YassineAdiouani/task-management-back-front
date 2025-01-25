import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages';
import AddTask from './pages/create'; 
import { TodoApi } from './service/todoApi';
import EditTask from './pages/edit';

export const HOME_ROUTE = '/';
export const ADD_ROUTE = '/ajoute';
export const EDIT_ROUTE = '/edit/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
 
  const fetchData = () => {
    setLoading(true)
    TodoApi.getAllTodos()
    .then(res => setTasks(res?.data?.tasks))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task?._id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>Liste de Tâches</h1>
      <hr />

      <Routes>
        <Route
          path={HOME_ROUTE}
          element={
            <Home
              isLoading={isLoading}
              tasks={tasks}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path={ADD_ROUTE}
          element={<AddTask tasks={tasks} setTasks={setTasks} fetchData={fetchData} />}
        />
        <Route
          path={EDIT_ROUTE + ':id'}
          element={<EditTask tasks={tasks} setTasks={setTasks} fetchData={fetchData} />}
        />
      </Routes>
    </div>
  );
}

export default App;