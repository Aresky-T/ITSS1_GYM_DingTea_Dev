import axios from "axios";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const folder = process.env.REACT_APP_FOLDER_NAME;

const cloudURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const uploadFileToCloudinaryApi = async (file) => {

    const formData = new FormData();
    formData.append('upload_preset', upload_preset)
    formData.append('folder', folder);
    formData.append('file', file);

    return await axios.post(cloudURL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}