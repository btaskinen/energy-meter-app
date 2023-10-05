import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/flow-data/current-data';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getCurrentFlowData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.get(baseUrl, config);
  return (await response).data;
};

export default {
  getCurrentFlowData,
  setToken,
};
