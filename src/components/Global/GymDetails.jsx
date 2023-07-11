import React, { useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";
import mapImage from "../../img/googlemap.jpg";

const GymDetails = ({ gym }) => {
  const [map, setMap] = useState("");

  useEffect(() => {
    const { address } = gym;
    const string = String(address.address).replace(/ /g, "+");
    setMap(string);
  }, [gym]);

  return (
    <div className="gym-detail-container">
      <div className="content_area">
        <div className="flex-container title_area">
          <img className="avatar" src={gym.logo} alt="" />
          <div className="gym_name">{gym.name}</div>
        </div>

        <div className="flex-container gym_info_area">
          <div className="gym-info-left">
            <div className="introduce">紹介</div>
            <div className="introduce_content">{gym.description}</div>
            <div className="gym_image_container">
              {gym.image1 && (
                <div className="gym_image">
                  <img src={gym.image1} alt="gym-i1" />
                </div>
              )}
              {gym.image2 && (
                <div className="gym_image">
                  <img src={gym.image2} alt="gym-i2" />
                </div>
              )}
              {gym.image3 && (
                <div className="gym_image">
                  <img src={gym.image3} alt="gym-i3" />
                </div>
              )}
              {gym.image4 && (
                <div className="gym_image">
                  <img src={gym.image4} alt="gym-i4" />
                </div>
              )}
              {gym.image5 && (
                <div className="gym_image">
                  <img src={gym.image5} alt="gym-i5" />
                </div>
              )}
            </div>

            <div className="introduce">オプション</div>
            <div className="flex-container gym_options_container">
              {gym.user_option &&
                [...gym.user_option].map((option) => (
                  <div className="gym_details_option" key={option.id}>
                    <div className="option_image">
                      <img src={option.image} alt="" />
                    </div>
                    <div className="option_title">{option.title}</div>
                    <div className="option_des">{option.description}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="separation-line"></div>
          <div className="gym-info-right">
            <div className="introduce">モットー</div>
            <div className="introduce_content">
              Vui lòng khách đến, vừa lòng khách đi
            </div>
            <div className="introduce">営業時間</div>
            <div className="introduce_content introduce_time">
              <FcAlarmClock size={24} className="clock_icon" />
              <span> 8:00 - 22:00 / 月曜日 - 日曜日</span>
            </div>
            <div className="introduce">アドレス</div>
            <div className="introduce_content">{gym.address?.address}</div>
            <a
              className="googlemap"
              href={`https://www.google.com/maps/place/${map}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={mapImage} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
