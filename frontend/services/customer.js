import api from "./api";

export const createCustomer = (data, imgBlob) => {
  const formData = new FormData();

  formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
  formData.append("photo", imgBlob);

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return api.post("customer", formData, { headers });
}

export const updateCustomer = (data, id) => {
  return api.post(`customer/atualiza/${id}`, data);
}

export const getCustomerById = (customerId) => {
  return api.get(`customer/${customerId}`);
}