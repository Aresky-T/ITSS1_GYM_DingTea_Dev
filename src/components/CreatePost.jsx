import React, { useRef, useState } from 'react'
import { uploadFileToCloudinaryApi } from '../api/file.api';

const CreatePost = ({formik}) => {
    const [imageURL, setImageURL] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const fileRef = useRef();

    const onClickChooseFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageURL(url);
        setSelectedFile(file);
    }

    const handleUploadImageToCloud = () => {
        uploadFileToCloudinaryApi(selectedFile)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSubmitToCreatePost = () => {
        console.log(formik.errors)
    }

    return (
        <div className='create-post-container'>
            <div className="content_area">
                <div className="create_post_title">
                    Create post
                </div>

                <div className="create_post_main flex-container">
                    <div className="flex-container title_n_content">
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" 
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="content">Content</label>
                        <textarea id="content"
                            name='content'
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>
                    <div className="side_form">
                        <div className="side_form_upload_image">
                            <h2 className='side_form_title'>Upload image</h2>
                            <div className="flex-container image_n_preview">
                                <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                        name="files[]"
                                        type="file"
                                        ref={fileRef}
                                        onChange={handleChangeFile}
                                    />
                                    <div className="Neon-input-dragDrop"
                                        onClick={onClickChooseFile}
                                    >
                                        Choose a file
                                    </div>
                                </div>

                                {imageURL && <div className="preview_image">
                                    <img src={imageURL} alt="" />
                                </div>}
                            </div>
                        </div>
                        <div className="flex-container button_area">
                            <button className="flex-container save_button"
                                onClick={handleSubmitToCreatePost}
                            >
                                Save
                            </button>
                            <button className="flex-container cancel_button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost