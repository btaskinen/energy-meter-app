import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/flow-data/latest-data';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getLatestFlowData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.get(baseUrl, config);
  return (await response).data;
};

export default {
  getLatestFlowData,
  setToken,
};
