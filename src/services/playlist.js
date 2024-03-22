import axios from 'axios';

const playlist = axios.create({
  baseURL: 'http://localhost:3011/api/playlist',
})

export const getAllPlaylists = async () => {
  const response = await playlist.get('/');
  return response.data;
}

export const getPlaylist = async (id) => {
  const response = await playlist.get(`/${id}`);
  return response.data;
}

export const createPlaylist = async () => {
  const response = await playlist.post('/');
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