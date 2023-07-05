import React from 'react'
import { FcAlarmClock } from 'react-icons/fc';
import mapImage from '../../img/googlemap.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const GymDetails = ({ gym }) => {
    const [map, setMap] = useState('');

    useEffect(() => {
        const { address } = gym;
        const string = String(address.address).replace(/ /g, "+");
        setMap(string);
    }, [gym])

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
                        <div className="gym_image_container">
                            {gym.image1 && <div className="gym_image">
                                <img src={gym.image1} alt="gym-i1" />
                            </div>}
                            {gym.image2 && <div className="gym_image">
                                <img src={gym.image2} alt="gym-i2" />
                            </div>}
                            {gym.image3 && <div className="gym_image">
                                <img src={gym.image3} alt="gym-i3" />
                            </div>}
                            {gym.image4 && <div className="gym_image">
                                <img src={gym.image4} alt="gym-i4" />
                            </div>}
                            {gym.image5 && <div className="gym_image">
                                <img src={gym.image5} alt="gym-i5" />
                            </div>}
                        </div>

                        <div className="introduce">
                            Option
                        </div>
                        <div className="flex-container gym_options_container">
                            {gym.user_option && [...gym.user_option].map(option => (
                                <div className="gym_details_option" key={option.id}>
                                    <div className="option_image">
                                        <img src={option.image} alt="" />
                                    </div>
                                    <div className="option_title">{option.title}</div>
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
                            <span> 8:00 - 22:00 / T2 - CN</span>
                        </div>
                        <div className="introduce">
                            Address
                        </div>
                        <div className="introduce_content">
                            {gym.address?.address}
                        </div>
                        <Link className="googlemap"
                            to={`https://www.google.com/maps/place/${map}`}
                        >
                            <img src={mapImage} alt="" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GymDetails