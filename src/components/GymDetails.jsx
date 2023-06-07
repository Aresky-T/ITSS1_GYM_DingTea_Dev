import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGymDetailsApi } from '../api/gym.api';
import { FcAlarmClock } from 'react-icons/fc';
import { scrollToTop } from '../util/AppUtils';

const GymDetails = ({gym}) => {

    const map = require("../img/googlemap.jpg")

    useEffect(() => {
        scrollToTop();
    }, [])

    return (
        <div className='gym-detail-container'>
            <div className="content_area">
                <div className="flex-container title_area">
                    <img className="avatar" src={gym.logo} alt="" />
                    <div className="gym_name">
                        {gym.name}
                    </div>
                </div>

                <div className="flex-container gym_info_area">
                    <div className='gym-info-left'>
                        <div className="introduce">
                            Introduce
                        </div>
                        <div className="introduce_content">
                            {gym.description}
                        </div>

                        <div className="flex-container gym_image_container">
                            <img className="gym_image" src={gym.image1} alt="" />
                            <img className="gym_image" src={gym.image2} alt="" />
                            <img className="gym_image" src={gym.image3} alt="" />
                        </div>

                        <div className="introduce">
                            Option
                        </div>
                        <div className="flex-container gym_options_container">
                            {gym.user_option && [...gym.user_option].map(option => (
                                <div className="gym_image" key={option.id}>
                                    <img src={option.image} alt="" />
                                    <div className="gym_options">{option.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="separation-line"></div>
                    <div className='gym-info-right'>
                        <div className="introduce">
                            The Motto
                        </div>
                        <div className="introduce_content">
                            Vui lòng khách đến, vừa lòng khách đi
                        </div>
                        <div className="introduce">
                            Opening hours
                        </div>
                        <div className="introduce_content">
                            <FcAlarmClock size={24} />
                            <span> 8:00 - 22:00 / T2 - VN</span>
                        </div>
                        <div className="introduce">
                            Address
                        </div>
                        <div className="introduce_content">
                            {gym.address?.address}
                        </div>
                        <img className="googlemap" src={map} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GymDetails