import axios from 'axios';

const image = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/image`,
})

export const getImagePath = async (formData) => {
  const response = await image.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}