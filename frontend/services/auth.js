import api from './api';

export const authenticate = (email, image) => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("photo", image);

    const headers = {
        "Content-Type": "multipart/form-data",
    };

    return api.post("/auth", formData, { headers });
}