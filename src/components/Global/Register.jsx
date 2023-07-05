import React, { useState } from "react";
import Page1 from "../Register/Page1"
import Page2 from "../Register/Page2"
import { useFormik } from "formik";
import * as yup from 'yup';
import { REGEX } from "../../constants/regex";
import { toast } from "react-hot-toast";
import { uploadFileToCloudinaryApi } from "../../api/file.api";
import { useDispatch } from "react-redux";
import { offLoading, onLoading } from "../../redux/slice/loading.slice";
import { registerUserApi } from "../../api/auth.api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const validatePage1 = yup.object().shape({
  name: yup.string().required("Required name").matches(REGEX.REGEX_STRING, "Invalid name!"),
  email: yup.string().required("Required email").matches(REGEX.REGEX_EMAIL, 'Invalid email, try again!'),
  address: yup.string().required("Required address").matches(REGEX.REGEX_STRING, "Invalid address!"),
  phone_num: yup.string().required("Required phone number").matches(REGEX.REGEX_PHONE, "Invalid phone number!"),
  password: yup.string().required("Required password").matches(REGEX.REGEX_PASSWORD, 'The password must contain both numbers and letters, without any special characters!'),
  confirmPassword: yup.string().required("Required confirm password").oneOf([yup.ref('password'), null], 'The confirmation password does not match the password!'),
})

const validatePage2 = yup.object().shape({
  description: yup.string().required("Required description").matches(REGEX.REGEX_STRING, 'Invalid description!'),
  logo: yup.array().min(1),
  images: yup.array().min(1),
  options: yup.array().min(0)
})

const Register = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page1 = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_num: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validatePage1
  })

  const page2 = useFormik({
    initialValues: {
      description: '',
      logoFile: [],
      imageFiles: [],
      options: [],
      type: 2
    },
    validationSchema: validatePage2
  })

  const handleChangeCurrentPage = (page) => {
    setCurrentPage(page)
  }

  const handleUploadGymImages = async (images) => {
    const arr = [];
    for (const file of images) {
      await uploadFileToCloudinaryApi(file)
        .then(res => {
          arr.push(res.data.secure_url);
        })
        .catch(err => {
          return err
        })
    }

    return arr;
  }

  const handleUploadLogo = async (file) => {
    let logo;
    await uploadFileToCloudinaryApi(file)
      .then(res => {
        logo = res.data.secure_url
      })
      .catch(err => {
        return err
      })
    return logo
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPage1 = validatePage1.isValidSync(page1.values);
    const isValidPage2 = validatePage2.isValidSync(page2.values);
    if (isValidPage1 && isValidPage2) {
      let form = { ...page1.values, ...page2.values };
      dispatch(onLoading());
      handleUploadGymImages(form.imageFiles)
        .then(images => {
          form.image1 = images[0];
          form.image2 = images[1];
          form.image3 = images[2];
          return form;
        })
        .then(form => {
          handleUploadLogo(form.logoFile[0]).then(logo => {
            form.logo = logo;
            return form;
          })
            .then(form => {
              registerUserApi(form)
                .then(res => {
                  dispatch(offLoading());
                  console.log("user: ", res.data)
                  Swal.fire({
                    icon: "success",
                    title: "Successfully",
                    text: "Congratulations on successful registration!",
                    confirmButtonText: "Login",
                    showConfirmButton: true,
                    showCancelButton: false
                  })
                    .then(res => {
                      if (res.isConfirmed) {
                        navigate("/auth/login")
                      }
                    })
                })
                .catch(err => {
                  toast.error("Register failed!")
                  dispatch(offLoading());
                  console.log(err)
                })
            })
            .catch(err => {
              toast.error("Upload logo failed!")
              dispatch(offLoading());
              console.log(err)
            });
        })
        .catch(err => {
          dispatch(offLoading());
          toast.error("Upload gym images failed!")
          console.log(err)
        })
      console.log(true)
    } else {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Invalid or missing data exists, please check again!",
        confirmButtonText: "OK",
      })
    }
  }

  return (
    <form className='register-container'
      onSubmit={handleSubmit}
    >
      <h1 className="register__title">
        Register
      </h1>
      {currentPage === 1 ?
        <div className="register__p1">
          <Page1 page1={page1} />
          <button type="button"
            onClick={() => handleChangeCurrentPage(2)}
            className="register__btn"
          >Next</button>
        </div>
        :
        <div className="register__p2">
          <button type="button"
            onClick={() => handleChangeCurrentPage(1)}
            className="btn--back"
          >back</button>
          <Page2 page2={page2} />
          <button
            className="register__btn"
            type="submit"
          >Save</button>
        </div>
      }
    </form>
  )
}

export default Register