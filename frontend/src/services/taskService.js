import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export const createTask = async (task, token) => {
  return axios.post(`${API_URL}/createTask`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllTasks = async (token) => {
  return axios.get(`${API_URL}/getAllTasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleTaskStatus = async (taskId, token) => {
  return axios.put(
    `${API_URL}/toggleStatus/${taskId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateTask = async (taskId, updates, token) => {
  return axios.put(`${API_URL}/update/${taskId}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const searchTasks = async (query, token) => {
  return axios.get(`${API_URL}/search`, {
    params: { query },
    headers: { Authorization: `Bearer ${token}` },
  });
};
