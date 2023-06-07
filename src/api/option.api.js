import axios from "axios";

const optionURL = "https://gymfinder.up.railway.app/api/option";

export const getAllOptionsApi = async () => {
    return await axios.get(`${optionURL}/all`);
}