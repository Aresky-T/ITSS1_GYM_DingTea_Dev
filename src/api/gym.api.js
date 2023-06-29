import axios from "axios";

const gymURL = "https://gymfinder.up.railway.app/api/user";

export const getFiveLatestGymsApi = async () => {
    return await axios.get(`${gymURL}/recent-gyms`)
}

export const getAllGymsForAdminApi = async () => {
    return await axios.get(`${gymURL}/all-accounts`)
}

export const getGymDetailsApi = async (id) => {
    return await axios.get(`${gymURL}/detail-gym/${id}`)
}

export const getGymsByFilterApi = async (name, ids) => {
    return await axios.post(`${gymURL}/filter-gyms`, {
        name: name,
        options: [...ids]
    })
}

export const changeGymStatusApi = (userId, gymId, status) => {
    return axios.put(`${gymURL}/manage-gym`, {
        user_id: userId,
        gym_id: gymId,
        status
    })
}