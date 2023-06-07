import React from 'react'

const GymDetails = () => {

    const avatar = require("../img/avatar.png");
    const gymImage1 = require("../img/gym1.jpg");
    const gymImage2 = require("../img/gym2.jpg");
    const pool = require("../img/pool.jpg")
    const school = require("../img/school.jpg")
    const map = require("../img/googlemap.jpg")

    return (
        <div className='gym-detail-container'>
            <div class="content_area">
                <div class="flex-container title_area">
                    <img class="avatar" src={avatar} alt="" />
                    <div class="gym_name">
                        Gym 123
                    </div>
                </div>

                <div class="flex-container gym_info_area">
                    <div className='gym-info-left'>
                        <div class="introduce">
                            Giới thiệu
                        </div>
                        <div class="introduce_content">
                            Chúng tôi có đồ xịn, phòng xịn, cái gì cũng xịn
                        </div>

                        <div class="flex-container gym_image_container">
                            <img class="gym_image" src={gymImage1} alt="" />
                            <img class="gym_image" src={gymImage2} alt="" />
                            <img class="gym_image" src={gymImage1} alt="" />
                        </div>

                        <div class="introduce">
                            Option
                        </div>

                        <div class="flex-container">
                            <div class="gym_image">
                                <img src={pool} alt="" />
                                <div class="gym_options">Có hồ bơi</div>
                            </div>
                            <div class="gym_image">
                                <img src={school} alt="" />
                                <div class="gym_options">Gần trường học</div>
                            </div>
                        </div>


                    </div>

                    <div className='gym-info-right'>
                        <div class="introduce">
                            Phương châm
                        </div>
                        <div class="introduce_content">
                            Vui lòng khách đến, vừa lòng khách đi
                        </div>
                        <div class="introduce">
                            Giờ mở cửa
                        </div>
                        <div class="introduce_content">
                            8:00 - 22:00 / T2 - VN
                        </div>
                        <div class="introduce">
                            Địa chỉ
                        </div>
                        <div class="introduce_content">
                            Khu 2 Hoàng cương - Thanh Ba - Phú Thọ
                        </div>

                        <img class="googlemap" src={map} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GymDetails