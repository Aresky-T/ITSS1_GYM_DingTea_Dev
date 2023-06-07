import axios from "axios";

const postURL = "https://gymfinder.up.railway.app/api/post"

export const getAllPostsApi = async () => {
    return await axios.get(`${postURL}/recent-posts`)
} 

export const getPostsBySearchApi = async (search) => {
    return await axios.get(`${postURL}/filter-posts`, {
        params: {
            title: search
        }
    })
}