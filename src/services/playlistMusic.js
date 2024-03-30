import axios from 'axios';

const playlistMusic = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/playlist-music`,
})

export const createPlaylistMusic = async (params) => {
  const response = await playlistMusic.post('/', params);
  return response.data;
}