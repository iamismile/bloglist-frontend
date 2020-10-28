import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlogObject, config);
  return response.data;
};

const update = async (id, newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${id}`;

  const response = await axios.put(url, newBlogObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${id}`;

  await axios.delete(url, config);
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
};
