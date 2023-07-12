import React, { useEffect, useRef, useState } from "react";

const CreatePost = ({
  errors,
  formData,
  handleCancelFormData,
  handleChangeFormData,
  handleSubmitForm,
  imageURL,
  setImageURL,
  handleChangeFile,
}) => {
  const [activeSubmit, setActiveSubmit] = useState(false);

  const fileRef = useRef();

  const onClickChooseFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  useEffect(() => {
    if (!errors.title && !errors.content && !errors.image) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [errors]);

  return (
    <div className="create-post-container">
      <div className="content_area">
        <div className="create_post_title">投稿を作成する</div>

        <div className="create_post_main flex-container">
          <div className="flex-container title_n_content">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChangeFormData}
              style={{
                fontSize: "20px",
              }}
            />
            <label htmlFor="content">内容</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChangeFormData}
            ></textarea>
          </div>
          <div className="side_form">
            <div className="side_form_upload_image">
              <h2 className="side_form_title">画像をアップロードする</h2>
              <div className="flex-container image_n_preview">
                <div className="Neon Neon-theme-dragdropbox">
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleChangeFile}
                  />
                  <div
                    className="Neon-input-dragDrop"
                    onClick={onClickChooseFile}
                  >
                    ファイルを選択してください
                  </div>
                </div>

                {imageURL && (
                  <div className="preview_image">
                    <img src={imageURL} alt="" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-container button_area">
              <button
                className={
                  activeSubmit
                    ? "flex-container save_button"
                    : "flex-container block_button"
                }
                onClick={handleSubmitForm}
              >
                保存
              </button>
              <button
                className="flex-container cancel_button"
                onClick={handleCancelFormData}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
