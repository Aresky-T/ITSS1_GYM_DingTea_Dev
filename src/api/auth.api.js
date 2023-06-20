import axios from "axios"

const authURL = "https://gymfinder.up.railway.app/api/user"

export const loginUserApi = ({ email, password }) => {
    return axios.post(`${authURL}/login`, {
        email, password
    })
}