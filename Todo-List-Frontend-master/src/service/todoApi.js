import { axiosClient } from "../api/axios";

export const TodoApi = {
    getAllTodos: async () => {
        return axiosClient.get('/tasks');
    },
    getTodoById: async taskId => {
        return axiosClient.get("/tasks/"+ taskId);
    },
    addTodo: async task => {
        return axiosClient.post('/tasks', task);
    },
    updateTodo: async task => {
        return axiosClient.put('/tasks/' + task?._id, task);
    },
    deleteTodo: async taskId => {
        return axiosClient.delete("/tasks/"+ taskId);
    },
}