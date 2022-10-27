import api from "./api";

export const transcript = (voiceBlob, fieldType) => {
    const formData = new FormData();

    let file = new File([voiceBlob], 'recording.ogg');
    formData.append("voice", file);
    formData.append("field-type", fieldType);
  
    const headers = {
      "Content-Type": "multipart/form-data",
    };
  
    return api.post("voice", formData, { headers });
  }