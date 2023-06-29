import React, {useEffect, useState} from 'react'
import GymDetails from '../../components/Global/GymDetails'
import {useParams} from "react-router-dom";
import {getGymDetailsApi} from "../../api/gym.api";

const GymDetailsContainer = () => {
  const [gym, setGym] = useState({});
  const param = useParams();

  function getGymDetails(gymId) {
    getGymDetailsApi(gymId)
      .then(res => {
        setGym(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (param.id) {
      getGymDetails(param.id);
    }
  }, [param])
  return (
    <GymDetails gym={gym}/>
  )
}

export default GymDetailsContainer