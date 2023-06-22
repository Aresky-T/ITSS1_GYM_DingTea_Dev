import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

const CreatePost = ({ errors, formData,
    handleCancelFormData, handleChangeFormData, handleSubmitForm,
    imageURL, setImageURL, handleChangeFile
}) => {

    const [activeSubmit, setActiveSubmit] = useState(false);

    const fileRef = useRef();

    const onClickChooseFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    useEffect(() => {
        if (!errors.title && !errors.content && !errors.image) {
            setActiveSubmit(true);
        } else {
            setActiveSubmit(false);
        }
    }, [errors])

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
                            value={formData.title}
                            onChange={handleChangeFormData}
                        />
                        <label htmlFor="content">Content</label>
                        <textarea id="content"
                            name='content'
                            value={formData.content}
                            onChange={handleChangeFormData}
                        ></textarea>
                    </div>
                    <div className="side_form">
                        <div className="side_form_upload_image">
                            <h2 className='side_form_title'>Upload image</h2>
                            <div className="flex-container image_n_preview">
                                <div className="Neon Neon-theme-dragdropbox">
                                    <input
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
                            <button className={activeSubmit ? "flex-container save_button" : "flex-container block_button"}
                                onClick={handleSubmitForm}
                            >
                                Save
                            </button>
                            <button className="flex-container cancel_button"
                                onClick={handleCancelFormData}
                            >
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