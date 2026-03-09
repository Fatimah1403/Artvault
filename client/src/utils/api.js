import axios from "axios";
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
})

export const searchArtworks = (query) =>
    API.get(`/artworks/search?q=${query}`);
export const getArtworks = (page = 1) =>
    API.get(`/artworks?page=${page}&limit=12`);
  
  export const getArtwork = (id) =>
    API.get(`/artworks/${id}`);
  
  export const getArtist = (id) =>
    API.get(`/artists/${id}`);
  
  export const getDepartments = () =>
    API.get('/departments');
  
  export const getImageUrl = (imageId, size = 843) => {
    if (!imageId || typeof imageId !== 'string' || imageId.trim() === '') return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
  };