import React, { useEffect, useState } from 'react'
import PostManager from '../../components/Admin/PostManager'
import { changePostStatusApi, getAllPostsApi } from "../../api/post.api";
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { customToast } from '../../config/toastConfig';
import { offLoading, onLoading } from '../../redux/slice/loading.slice';
import { toast } from 'react-hot-toast';

export const ActionType = {
  APPROVE: 'approve',
  REJECT: 'reject'
}


const PostManagerContainer = () => {
  const [posts, setPosts] = useState([]);
  const [action, setAction] = useState({
    post: '',
    actionType: '',
    isShowConfirm: false
  })

  const [message, setMessage] = useState();

  const account = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleShowModal = (action, post) => {
    if (post.status === action && action === ActionType.APPROVE) {
      customToast("This post has been approved!", '⚠️')
      return;
    }
    if (post.status === action && action === ActionType.REJECT) {
      customToast("This post has been rejected!", '⚠️')
      return;
    }
    setAction({
      post: post,
      actionType: action,
      isShowConfirm: true
    })
  }

  const handleApprove = async () => {
    let data;
    await changePostStatusApi(account.id, action.post.id, 2)
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
    await changePostStatusApi(account.id, action.post.id, 3)
      .then(res => {
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

  const handleChangeStatusPost = () => {
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
    getAllPostsApi()
      .then(res => {
        setPosts(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [message])

  return (
    <PostManager
      action={action}
      handleChangeStatusPost={handleChangeStatusPost}
      handleCloseModal={handleCloseModal}
      handleShowModal={handleShowModal}
      message={message}
      posts={posts}
    />
  )
}

export default PostManagerContainer