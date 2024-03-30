import axios from 'axios';

const playlist = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/playlist`,
})

export const getAllPlaylists = async (params) => {
  const response = await playlist.post('/search', params, {
    headers: {
      'Content-Type': 'application/json' 
    }
  });
  return response.data;
}

export const getPlaylist = async (id) => {
  const response = await playlist.get(`/${id}`);
  return response.data;
}

export const createPlaylist = async (params) => {
  const response = await playlist.post('/', params);
  return response.data;
}

export const updatePlaylist = async (id) => {
  const response = await playlist.put(`/${id}`);
  return response.data;
}

export const deletePlaylist = async (id) => {
  const response = await playlist.delete(`/${id}`);
  return response.data;
}