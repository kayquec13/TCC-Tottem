import api from './api';

export const detect = (customerId, imgBlob) => {
    const formData = new FormData();
    formData.append("photo", imgBlob);

    const headers = {
        "Content-Type": "multipart/form-data",
    };

    return api.post(`detect-face/${customerId}`, formData, { headers });
}