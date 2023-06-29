import axios from "axios";

const postURL = "https://gymfinder.up.railway.app/api/post"

export const getAllPostsApi = async () => {
    return axios.get(`${postURL}/all-posts`)
} 

export const getPostsBySearchApi = async (title, options) => {
    return axios.post(`${postURL}/filter-posts`, {title, options: [...options]})
}

export const getPostByIdApi = (postId) => {
    return axios.get(`${postURL}/detail-post/${postId}`);
}

export const getRecentPostsApi = async () => {
    return axios.get(`${postURL}/recent-posts`)
} 

export const createPostApi = (data) => {
    return axios.post(`${postURL}/create`, data)
}

export const updatePostApi = (postId, data) => {
    return axios.put(`${postURL}/edit/${postId}`, data);
}

export const changePostStatusApi = (userId, postId, status) => {
    return axios.put(`${postURL}/manage-post`, {
        user_id: userId,
        post_id: postId,
        status: status
    })
}