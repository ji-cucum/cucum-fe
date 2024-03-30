import axios from 'axios';

const user = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user`,
})

export const getUser = async (id) => {
  const response = await user.get(`/${id}`, {
    headers: {
      'Content-Type': 'application/json' 
    }
  });
  return response.data;
}