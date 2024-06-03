import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5191/",
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
    } as any;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return Promise.reject({
          status: err.response.status,
          message: err.response.data,
          error: err.message,
        });
      }

      if (err.request) {
        return Promise.reject({
          status: 500,
          message: "Erro ao se comunicar com a API",
          error: err.message,
        });
      }

      return Promise.reject({
        status: 500,
        message: "Erro interno no sistema",
        error: err.message,
      });
    }

    return Promise.reject(err);
  }
);
