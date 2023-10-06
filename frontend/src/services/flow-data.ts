import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/flow-data';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAllFlowData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.get(baseUrl, config);
  return (await response).data;
};

const getLatestFlowData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.get(`${baseUrl}/latest-data`, config);
  return (await response).data;
};

export default {
  getLatestFlowData,
  getAllFlowData,
  setToken,
};
