import { getToken } from './authenticate';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchWithAuthorization = async (url, method, data = null) => {
  const token = getToken();
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Request failed:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Request failed:', error.message);
    return [];
  }
};

const addToFavourites = async (id) => {
  return await fetchWithAuthorization(`favourites/${id}`, 'PUT');
};

const removeFromFavourites = async (id) => {
  return await fetchWithAuthorization(`favourites/${id}`, 'DELETE');
};

const getFavourites = async () => {
  return await fetchWithAuthorization('favourites', 'GET');
};

const addToHistory = async (id) => {
  return await fetchWithAuthorization(`history/${id}`, 'PUT');
};

const removeFromHistory = async (id) => {
  return await fetchWithAuthorization(`history/${id}`, 'DELETE');
};

const getHistory = async () => {
  return await fetchWithAuthorization('history', 'GET');
};

export { addToFavourites, removeFromFavourites, getFavourites, addToHistory, removeFromHistory, getHistory };
