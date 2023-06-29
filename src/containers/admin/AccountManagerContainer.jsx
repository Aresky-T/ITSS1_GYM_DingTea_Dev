import React from 'react'
import AccountManager from '../../components/Admin/AccountManager'
import { useState } from 'react'
import { useEffect } from 'react';
import { changeGymStatusApi, getAllGymsForAdminApi } from '../../api/gym.api';
import { toast } from 'react-hot-toast';
import { offLoading, onLoading } from '../../redux/slice/loading.slice';
import { ActionType } from './PostManagerContainer';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { customToast } from '../../config/toastConfig';

const AccountManagerContainer = () => {
  const [gyms, setGyms] = useState([]);

  const [action, setAction] = useState({
    gym: '',
    actionType: '',
    isShowConfirm: false
  })

  const [message, setMessage] = useState();

  const account = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleShowModal = (action, gym) => {
    if (gym.status === "active" && action === ActionType.APPROVE) {
      customToast("This gym has been approved!", '⚠️')
      return;
    }
    if (gym.status === "inactive" && action === ActionType.REJECT) {
      customToast("This gym has been rejected!", '⚠️')
      return;
    }
    setAction({
      gym: gym,
      actionType: action,
      isShowConfirm: true
    })
  }

  const handleApprove = async () => {
    let data;
    await changeGymStatusApi(account.id, action.gym.id, 1)
      .then(res => {
        dispatch(offLoading());
        handleCloseModal();
        toast.success("Approved success!");
        data = res.data;
      })
      .catch(err => {
        dispatch(offLoading());
        handleCloseModal();
        toast.error("Approve failed")
        console.log(err)
      })

    return data;
  }

  const handleReject = async () => {
    let data;
    await changeGymStatusApi(account.id, action.gym.id, 2)
      .then(res => {
        console.log(res)
        dispatch(offLoading());
        handleCloseModal();
        toast.success('Rejected success!')
        data = res.data;
      })
      .catch(err => {
        dispatch(offLoading());
        handleCloseModal();
        toast.error("Reject failed!")
        console.log(err)
      })

    return data;
  }

  const handleChangeStatusGym = () => {
    dispatch(onLoading());
    switch (action.actionType) {
      case ActionType.APPROVE:
        handleApprove()
          .then(data => {
            setMessage("Approved success")
          });
        break;
      case ActionType.REJECT:
        handleReject()
          .then(data => {
            setMessage("Rejected success")
          });
        break;
      default:
    }
  }

  const handleCloseModal = () => {
    setAction({ ...action, isShowConfirm: false })
  }

  useEffect(() => {
    getAllGymsForAdminApi()
      .then(res => {
        setGyms(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [message])
  return (
    <AccountManager
      action={action}
      gyms={gyms}
      handleChangeStatusGym={handleChangeStatusGym}
      handleCloseModal={handleCloseModal}
      handleShowModal={handleShowModal}
    />
  )
}

export default AccountManagerContainer