import axios from 'axios';
// Axios Wrapper

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

// Intercepts requests and adds token if available.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepts responses and checks for errors.
// Removes token if unauthorized. Redirects to login.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); 
      location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const getApi = async (url: string, data?: any) => {
  try {
    const response = await api.get(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const postApi = async (url: string, data?: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const patchApi = async (url: string, data?: any) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteApi = async (url: string) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getApi, postApi, patchApi, deleteApi };
