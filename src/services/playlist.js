import axios from 'axios';

const playlist = axios.create({
  baseURL: '/api/playlist'
})

export const getAllPlaylists = async (params) => {
  const response = await playlist.post('/', params, {
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