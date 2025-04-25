// src/services/api.ts

import axios from 'axios';

// API base URL
const api = axios.create({
  baseURL: 'https://localhost:7167/api', // Replace with your base API URL
});

// Fetch users data
export const getUsers = () => api.get('/admin/get_users');


export const getUsersAdmin = () => {
    return axios.get("https://localhost:7167/api/admin/get_users")
    .then(res => res)
}

// Fetch orders data
export const getOrders = () => api.get('/orders');

// Fetch all data and join based on userId
export const fetchJoinedData = async () => {
  try {
    // Make requests in parallel using axios.all
    const [usersResponse, ordersResponse] = await axios.all([
      getUsers(),
      getOrders(),
    ]);

    const users = usersResponse.data;
    const orders = ordersResponse.data;

    // Join data based on userId
    const joinedData = users.map((user: any) => {
      const userOrders = orders.filter((order: any) => order.userId === user.id);
      return { ...user, orders: userOrders };
    });

    return joinedData;
  } catch (error) {
    console.error(OOPS!No fetching data:', error);
    throw error;
  }
};
