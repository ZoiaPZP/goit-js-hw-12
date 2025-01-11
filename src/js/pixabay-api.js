import axios from 'axios';

export async function service(query, page = 1, perPage = 15) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '48018775-66f870a0a55ddc658d7ca6c06';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  console.log("API request:", `${BASE_URL}?${params}`); 

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log("Successful API response:", response.data); 
    return response;
  } catch (error) {
    console.error("API request error:", error); 
    throw error;
  }
}