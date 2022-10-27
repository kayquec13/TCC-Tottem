import api from "./api";

export const findAddress = (cep) => {
  return api.get(`address/${cep}`);
}