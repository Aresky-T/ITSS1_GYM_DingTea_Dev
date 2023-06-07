import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ posts, gyms }) => {

    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <div class="flex-container">
                <img class="cover_image" src={require("../img/gym1.jpg")} alt="" />
                <img class="cover_image" src={require("../img/gym2.jpg")} alt="" />
            </div>
            <div class="flex-container content_area">
                <div class="post_area">
                    {
                        [...posts].map(post => (
                            <>
                                <div class="flex-container post_card"
                                    key={post.id}
                                    onClick={() => {
                                        navigate(`/post/${post.id}`)
                                    }}
                                >
                                    <img src={require("../img/avatar.png")} class="post_avatar" alt="" />
                                    <div class="post_content">
                                        <div class="flex-container author_n_time">
                                            <div class="post_author">
                                                {post.user?.name}
                                            </div>
                                            <div class="post_time">
                                                {post.created_at ? post.created_at : "2023/04/12"}
                                            </div>
                                        </div>
                                        <div class="post_title">
                                            {post.title}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>


                <div class="gym_area">
                    <div class="gym_area_title">
                        Nổi bật
                    </div>
                    {
                        [...gyms].map(gym => (
                            <>
                                <div class="flex-container gym_card"
                                    key={gym.id}
                                    onClick={() => {
                                        navigate(`/gym/${gym.id}`)
                                    }}
                                >
                                    <img class="gym_image" src={require("../img/gym1.jpg")} alt="" />
                                    <div class="gym_content">
                                        <div class="gym_name">
                                            {gym.name}
                                        </div>
                                        <div class="gym_address">
                                            <span>Địa chỉ: </span>{gym.address ? gym.address.address : "Số 1 Đại Cồ Việt - Hai Bà Trưng - Hà Nội"}
                                        </div>
                                        <div class="gym_detail">
                                            {gym.description}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home