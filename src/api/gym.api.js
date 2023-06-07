import axios from "axios";

const gymURL = "https://gymfinder.up.railway.app/api/user";

export const getFiveLatestGymsApi = async () => {
    return await axios.get(`${gymURL}/recent-gyms`)
}

export const getAllGymsApi = async () => {
    return await axios.get(`${gymURL}/list-gyms`)
}