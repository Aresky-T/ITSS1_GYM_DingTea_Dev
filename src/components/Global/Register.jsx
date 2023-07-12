import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { registerUserApi } from "../../api/auth.api";
import { uploadFileToCloudinaryApi } from "../../api/file.api";
import { REGEX } from "../../constants/regex";
import { offLoading } from "../../redux/slice/loading.slice";
import Page1 from "../Register/Page1";
import Page2 from "../Register/Page2";
import { onLoading } from "./../../redux/slice/loading.slice";

const validatePage1 = yup.object().shape({
  name: yup
    .string()
    .required("必須の名前")
    .matches(REGEX.REGEX_STRING, "無効な名前!"),
  email: yup
    .string()
    .required("必須メールアドレス")
    .matches(
      REGEX.REGEX_EMAIL,
      "メールアドレスが無効です。もう一度お試しください!"
    ),
  address: yup
    .string()
    .required("必須のアドレス")
    .matches(REGEX.REGEX_STRING, "無効なアドレス!"),
  phone_num: yup
    .string()
    .required("必須の電話番号")
    .matches(REGEX.REGEX_PHONE, "無効な電話番号!"),
  password: yup
    .string()
    .required("必要なパスワード")
    .matches(
      REGEX.REGEX_PASSWORD,
      "パスワードには、特殊文字を含めずに数字と文字の両方を含める必要があります!"
    ),
  confirmPassword: yup
    .string()
    .required("必須の確認パスワード")
    .oneOf(
      [yup.ref("password"), null],
      "確認パスワードがパスワードと一致しません!"
    ),
});

const validatePage2 = yup.object().shape({
  description: yup
    .string()
    .required("必須の説明")
    .matches(REGEX.REGEX_STRING, "無効な説明!"),
  logo: yup.array().min(1),
  images: yup.array().min(1),
  options: yup.array().min(0),
});

const Register = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page1 = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_num: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validatePage1,
  });

  const page2 = useFormik({
    initialValues: {
      description: "",
      logoFile: [],
      imageFiles: [],
      options: [],
      type: 2,
    },
    validationSchema: validatePage2,
  });

  const handleChangeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleUploadGymImages = async (images) => {
    const arr = [];
    for (const file of images) {
      await uploadFileToCloudinaryApi(file)
        .then((res) => {
          arr.push(res.data.secure_url);
        })
        .catch((err) => {
          return err;
        });
    }

    return arr;
  };

  const handleUploadLogo = async (file) => {
    let logo;
    await uploadFileToCloudinaryApi(file)
      .then((res) => {
        logo = res.data.secure_url;
      })
      .catch((err) => {
        return err;
      });
    return logo;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPage1 = validatePage1.isValidSync(page1.values);
    const isValidPage2 = validatePage2.isValidSync(page2.values);

    if (isValidPage1 && isValidPage2) {
      let form = { ...page1.values, ...page2.values };
      dispatch(onLoading());
      handleUploadGymImages(form.imageFiles)
        .then((images) => {
          form.image1 = images[0];
          form.image2 = images[1];
          form.image3 = images[2];
          return form;
        })
        .then((form) => {
          console.log("🚀 ~ file: Register.jsx:137 ~ .then ~ form:", form);
          // return;
          handleUploadLogo(form.logoFile[0])
            .then((logo) => {
              form.logo = logo;
              return form;
            })
            .then((form) => {
              registerUserApi(form)
                .then((res) => {
                  dispatch(offLoading());
                  Swal.fire({
                    icon: "success",
                    title: "成功しました",
                    text: "登録成功おめでとうございます!",
                    confirmButtonText: "Login",
                    showConfirmButton: true,
                    showCancelButton: false,
                  }).then((res) => {
                    if (res.isConfirmed) {
                      navigate("/auth/login");
                    }
                  });
                })
                .catch((err) => {
                  toast.error("登録に失敗しました!");
                  dispatch(offLoading());
                  console.log(err);
                });
            })
            .catch((err) => {
              toast.error("ロゴのアップロードに失敗しました!");
              dispatch(offLoading());
              console.log(err);
            });
        })
        .catch((err) => {
          dispatch(offLoading());
          toast.error("ジムの画像のアップロードに失敗しました!");
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "警告",
        icon: "warning",
        text: "無効なデータまたは欠落しているデータが存在します。もう一度確認してください",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form className="register-container" onSubmit={handleSubmit}>
      <h1 className="register__title">登録</h1>
      {currentPage === 1 ? (
        <div className="register__p1">
          <Page1 page1={page1} />
          <button
            type="button"
            onClick={() => handleChangeCurrentPage(2)}
            className="register__btn"
          >
            次へ
          </button>
        </div>
      ) : (
        <div className="register__p2">
          <button
            type="button"
            onClick={() => handleChangeCurrentPage(1)}
            className="btn--back"
          >
            戻る
          </button>
          <Page2 page2={page2} />
          <button className="register__btn" type="submit">
            保存
          </button>
        </div>
      )}
    </form>
  );
};

export default Register;
