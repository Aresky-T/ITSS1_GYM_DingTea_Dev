import React, { useEffect, useState } from 'react'
import GymDetails from '../../components/Global/GymDetails'
import { useNavigate, useParams } from "react-router-dom";
import { getGymDetailsApi } from "../../api/gym.api";
import { APP_ROUTE } from '../../constants/routes';

const GymDetailsContainer = () => {
  const [gym, setGym] = useState({
    logo: '',
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    user_option: [],
    address: {}
  });
  const param = useParams();
  const navigate = useNavigate();

  function getGymDetails(gymId) {
    getGymDetailsApi(gymId)
      .then(res => {
        const data = res.data.data[0];
        const obj = { ...gym }
        for (let key in data) {
          if (Object.hasOwnProperty.call(obj, key)) {
            obj[key] = data[key];
          }
        }
        setGym(obj);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (gym.status && gym.status === "inactive") {
      navigate(APP_ROUTE.HOME);
    }
    //eslint-disable-next-line
  }, [gym.status])

  useEffect(() => {
    if (param.id) {
      getGymDetails(param.id);
    }
    //eslint-disable-next-line
  }, [param])
  
  return (
    <GymDetails gym={gym} />
  )
}

export default GymDetailsContainer