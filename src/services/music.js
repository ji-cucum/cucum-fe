import axios from 'axios';

const music = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/music`,
})

export const getAllMusics = async (params) => {
  const response = await music.post('/', params, {
    headers: {
      'Content-Type': 'application/json' 
    }
  });
  return response.data;
}

export const getMusic = async (id) => {
  const response = await music.get(`/${id}`);
  return response.data;
}

export const createMusic = async (params) => {
  const response = await music.post('/', params);
  return response.data;
}

export const updateMusic = async (id) => {
  const response = await music.put(`/${id}`);
  return response.data;
}

export const deleteMusic = async (id) => {
  const response = await music.delete(`/${id}`);
  return response.data;
}