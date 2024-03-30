import axios from 'axios';

const userPlaylist = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user-playlist`,
})

export const createUserPlaylist = async (params) => {
  const response = await userPlaylist.post('/', params);
  return response.data;
}