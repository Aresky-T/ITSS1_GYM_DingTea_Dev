import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMapPin } from 'react-icons/hi2'
import { MdDescription } from 'react-icons/md'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

const Home = ({ posts, gyms }) => {

    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <Splide
                options={{
                    rewind: true,
                    autoplay: true,
                    pauseOnHover: false,
                    type: 'loop', 
                    interval: 3000,
                    arrows: false
                }}
                aria-label="My Banner Images"
                className='carousel'
            >
                <SplideSlide>
                    <img className="cover_image slide" src={require("../img/gym1.jpg")} alt="" />
                </SplideSlide>
                <SplideSlide>
                    <img className="cover_image slide" src={require("../img/gym2.jpg")} alt="" />
                </SplideSlide>
                <SplideSlide>
                    <img className="cover_image slide" src={require("../img/gym3.jpg")} alt="" />
                </SplideSlide>
            </Splide>
            {/* <div className="flex-container carousel">
                <img className="cover_image slide" src={require("../img/gym1.jpg")} alt="" />
                <img className="cover_image slide" src={require("../img/gym2.jpg")} alt="" />
            </div> */}
            <div className="flex-container content_area">
                <div className="post_area">
                    <div className="post_area_title">
                        Posts
                    </div>
                    {
                        [...posts].map(post => (
                            <React.Fragment key={post.id}>
                                <div className="flex-container post_card"
                                    onClick={() => {
                                        navigate(`/post/${post.id}`)
                                    }}
                                >
                                    <img src={require("../img/avatar.png")} className="post_avatar" alt="" />
                                    <div className="post_content">
                                        <div className="flex-container author_n_time">
                                            <div className="post_author">
                                                {post.user?.name}
                                            </div>
                                            <div className="post_time">
                                                {new Date(post.created_at).toLocaleDateString('en-EN', { dateStyle: "long" })}
                                            </div>
                                        </div>
                                        <div className="post_title">
                                            {post.title}
                                        </div>
                                    </div>
                                </div>
                                <div className='separation-line'></div>
                            </React.Fragment>
                        ))
                    }
                </div>


                <div className="gym_area">
                    <div className="gym_area_title">
                        Hot Gym
                    </div>
                    {
                        [...gyms].map(gym => (
                            <div className="flex-container gym_card"
                                key={gym.id}
                                onClick={() => {
                                    navigate(`/gym/${gym.id}`)
                                }}
                            >
                                <img className="gym_image" src={gym.logo} alt="" />
                                <div className="gym_content">
                                    <div className="gym_name">
                                        {gym.name}
                                    </div>
                                    <div className="gym_address">
                                        <span className='address-svg-icon'><HiMapPin size={20} /></span>
                                        <span>{gym.address ? gym.address.address : "Số 1 Đại Cồ Việt - Hai Bà Trưng - Hà Nội"}</span>
                                    </div>
                                    <div className="gym_detail">
                                        <span className="gym-detail-svg-icon"><MdDescription size={20} /></span>
                                        <span>{gym.description}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home