import axios from 'axios';

const music = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/music`,
})

export const getAllMusics = async (params) => {
  const response = await music.post('/search', params, {
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
  console.log(response.data)
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

export const searchMusics = async (keyword) => {
  const response = await music.get(`/search/musics/${keyword}`);
  return response.data;
}