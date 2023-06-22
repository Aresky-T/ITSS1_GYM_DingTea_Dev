import React, { useState } from 'react'
import CreatePost from '../components/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { uploadFileToCloudinaryApi } from '../api/file.api'
import { offLoading, onLoading } from '../redux/slice/loading.slice'
import { createPostApi } from '../api/post.api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CreatePostContainer = () => {

  const user = useSelector(authSelector)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 1,
    image: '',
    user_id: null
  })
  const [errors, setErrors] = useState({
    title: null, content: null, image: null
  })
  const [imageURL, setImageURL] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setSelectedFile(file);
  }

  const validateFormData = ({ title, content, image }) => {
    let titleLength = title.trim().length;
    let contentLength = content.trim().length;
    let imageLength = image.trim().length;
    let errs = { title: null, content: null, image: null };

    if (titleLength === 0) {
      errs.title = "Required title!";
    }

    if (contentLength === 0) {
      errs.content = "Required content!";
    }

    if (imageLength === 0) {
      errs.image = "Required image!";
    }

    if (titleLength > 0 && contentLength > 0 && imageLength > 0) {
      errs.content = null; errs.title = null; errs.image = null;
      setErrors(errs)
      return true;
    }

    setErrors(errs);
    return false;
  }

  const handleChangeFormData = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmitForm = () => {
    const validFormData = validateFormData({ title: formData.title, content: formData.content, image: imageURL });
    if (validFormData) {
      dispatch(onLoading());
      uploadFileToCloudinaryApi(selectedFile)
        .then(res => {
          return res.data.secure_url
        })
        .then((link) => {
          setFormData({
            ...formData,
            image: link
          })

          createPostApi({ title: formData.title, content: formData.content, image: link, status: 1, user_id: formData.user_id })
            .then(res => {
              dispatch(offLoading());
            })
            .then(() => {
              Swal.fire({
                title: "Create post successfully!",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              })
                .then(result => {
                  if (result.isConfirmed) {
                    navigate("/")
                  }
                })
            })
            .catch(err => {
              dispatch(offLoading());
              toast.error("Post creation failed!")
              console.log(err)
            })
        })
        .catch(err => {
          dispatch(offLoading());
          toast.error("Post creation failed!")
          console.log(err)
        })

    }
  }

  const handleCancelFormData = () => {
    setFormData({
      ...formData,
      title: '',
      content: '',
      image: ''
    })

    setImageURL('');
  }

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        user_id: user.id
      })
    }
    //eslint-disable-next-line
  }, [user])

  useEffect(() => {
    validateFormData({ title: formData.title, content: formData.content, image: imageURL })
  }, [formData, imageURL])

  return (
    <CreatePost
      errors={errors}
      formData={formData}
      imageURL={imageURL}
      handleChangeFile={handleChangeFile}
      handleCancelFormData={handleCancelFormData}
      handleChangeFormData={handleChangeFormData}
      handleSubmitForm={handleSubmitForm}
      setImageURL={setImageURL}
    />
  )
}

export default CreatePostContainer