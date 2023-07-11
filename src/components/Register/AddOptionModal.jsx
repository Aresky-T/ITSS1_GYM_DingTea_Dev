import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as yup from "yup";
import { uploadFileToCloudinaryApi } from "../../api/file.api";
import { getAllOptionsApi } from "../../api/option.api";
import { REGEX } from "../../constants/regex";
import { offLoading, onLoading } from "../../redux/slice/loading.slice";

const validateOption = yup.object().shape({
  option_id: yup
    .number()
    .required("Required optionId")
    .min(1, "optionId must be greater than 0!"),
  title: yup
    .string()
    .required("Required title")
    .matches(REGEX.REGEX_STRING, "Invalid title!"),
  description: yup
    .string()
    .required("Required description")
    .matches(REGEX.REGEX_STRING, "Invalid description!"),
  imageLocal: yup
    .string()
    .required("Required local image")
    .matches(REGEX.REGEX_STRING, "Invalid local image!"),
});

const AddOptionModal = ({ setIsShowModal, page2 }) => {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState({
    option_id: 0,
    option_name: "",
    title: "",
    imageLocal: "",
    selectedFile: "",
    description: "",
  });
  const dispatch = useDispatch();

  const imageRef = useRef();

  const onClickUploadFile = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleChangeFile = (e) => {
    if (e.target) {
      const file = e.target.files[0];
      file.url = URL.createObjectURL(file);
      setOption({
        ...option,
        selectedFile: file,
        imageLocal: file.url,
      });
    }
  };

  const handleChangeOption = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setOption({
        ...option,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    validateOption
      .isValid(option)
      .then((isValid) => {
        if (isValid) {
          dispatch(onLoading());
          uploadFileToCloudinaryApi(option.selectedFile)
            .then((res) => {
              const { option_id, title, description } = option;
              page2.setValues({
                ...page2.values,
                options: [
                  ...page2.values.options,
                  { option_id, title, description, image: res.data.secure_url },
                ],
              });
              dispatch(offLoading());
              setIsShowModal(false);
              toast.success("オプション追加成功!");
            })
            .catch((err) => {
              console.log(err);
              dispatch(offLoading());
              toast.error("オプションの追加に失敗しました!");
            });
        } else {
          Swal.fire({
            title: "Warning",
            icon: "warning",
            text: "無効なデータまたは欠落しているデータが存在します。もう一度確認してください　",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllOptionsApi()
      .then((res) => {
        const opts = [...res.data.data];
        setOptions(opts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="modal-container option-modal-container flex-container">
      <div className="custom-modal">
        <div className="modal__header">
          <h2 className="modal-title">オプションを追加</h2>
          <span
            className="modal-btn--close"
            onClick={() => {
              setIsShowModal(false);
            }}
          >
            <GrClose />
          </span>
        </div>
        <div className="modal__main">
          <h3 className="modal__main__title">オプションを選択:</h3>
          <Box className="modal-main-box">
            <FormControl fullWidth className="modal-main-form-control">
              <InputLabel
                id="select-option__label"
                className="custom-label-input"
              >
                オプションの種類
              </InputLabel>
              <Select
                labelId="select-option__label"
                id="demo-select-option"
                label="option"
                value={option.option_name}
              >
                {options.map((opt) => (
                  <MenuItem
                    value={opt.name}
                    key={opt.id}
                    onClick={() => {
                      setOption({
                        ...option,
                        option_name: opt.name,
                        option_id: opt.id,
                      });
                    }}
                  >
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <h3 className="modal__main__title">タイトル:</h3>
          <input
            type="text"
            name="title"
            className="option-field"
            value={option.title}
            onChange={handleChangeOption}
          />
          <h3 className="modal__main__title">説明:</h3>
          <textarea
            name="description"
            className="option-field"
            value={option.description}
            onChange={handleChangeOption}
          />
          <h3 className="modal__main__title">画像をアップロード:</h3>
          <div className="option-image-upload">
            {option.imageLocal.length > 0 ? (
              <>
                <div className="option-image-selected">
                  <img src={option.imageLocal} alt="" />
                </div>
                <span
                  className="option-image-icon-delete"
                  onClick={() => {
                    setOption({ ...option, selectedFile: "", imageLocal: "" });
                  }}
                >
                  <AiTwotoneDelete />
                </span>
              </>
            ) : (
              <>
                <input type="file" ref={imageRef} onChange={handleChangeFile} />
                <div className="choose-file" onClick={onClickUploadFile}>
                  <div className="choose-file-icon">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png"
                      alt=""
                    />
                  </div>
                  <p>画像をアップロード</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={handleSubmit}>
            オプションを追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOptionModal;
