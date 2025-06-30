import axios from "axios";

const CLOUD_NAME = 'dbuvxdwbn';
const UPLOAD_PRESET = 'unsigned_test';

export const getPhotoLink = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    console.log('Cloudinary image URL:', res.data.secure_url);

    return res.data.secure_url;
  } catch (err) {
    console.error('Ошибка при загрузке:', err);
  }
};
