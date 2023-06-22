import React, { useEffect, useRef, useState } from 'react'
import AddOptionModal from './AddOptionModal';

const Page2 = ({ formik }) => {

    const [selectedFiles, setSelectedFiles] = useState({
        images: [...formik.values.imageFiles],
        logo: [...formik.values.logoFile]
    })

    const [isShowModal, setIsShowModal] = useState(false);

    const logoRef = useRef();
    const imagesRef = useRef();

    const onClickChooseImage = () => {
        if (imagesRef.current) {
            imagesRef.current.click();
        }
    }

    const onClickChooseLogo = () => {
        if (logoRef.current) {
            logoRef.current.click();
        }
    }

    const handleChangeFiles = (e) => {
        if (e.target) {
            const { name, files } = e.target;
            if (name === "images" && files.length > 5) {
                alert("Can't choose more than 5 files!");
                return;
            }

            setSelectedFiles({
                ...selectedFiles,
                [name]: files
            })
        }
    }

    useEffect(() => {
        if (selectedFiles.images.length > 0 && selectedFiles.logo.length > 0) {
            formik.setValues({
                ...formik.values,
                imageFiles: selectedFiles.images,
                logoFile: selectedFiles.logo
            })
        }
        //eslint-disable-next-line
    }, [selectedFiles])

    return (
        <div className='page2-main'>
            <div className="flex-container register__upload-file">
                <div className="upload-gym-images">
                    <div className="rgi__title">
                        Upload images
                    </div>
                    <div className="register__main"
                        onClick={onClickChooseImage}
                    >
                        {
                            [...selectedFiles.images].length === 0 ?
                                <>
                                    <div className="rgm__choose-file">
                                        Choose file
                                    </div>
                                    <input
                                        type="file"
                                        name='images'
                                        multiple
                                        ref={imagesRef}
                                        onChange={handleChangeFiles}
                                    />
                                </>
                                :
                                <div className="rgm__selectedFiles">
                                    {[...selectedFiles.images].map((file, index) => {
                                        file.url = URL.createObjectURL(file);

                                        return (
                                            <div className='rgm__selectedFiles__item' key={index}>
                                                <img src={file.url} alt='' />
                                            </div>
                                        )
                                    })}
                                </div>
                        }
                    </div>
                </div>
                <div className="upload-gym-logo">
                    <div className="rgi__title">
                        Upload Logo
                    </div>
                    <div className="register__main"
                        onClick={onClickChooseLogo}
                    >
                        {
                            [...selectedFiles.logo].length === 0 ?
                                <>
                                    <div className="rgm__choose-file">
                                        Choose file
                                    </div>
                                    <input type="file"
                                        name='logo'
                                        ref={logoRef}
                                        onChange={handleChangeFiles}
                                    />
                                </>
                                :
                                <div className="rgm__selectedFiles">
                                    {[...selectedFiles.logo].map((file, index) => {
                                        file.url = URL.createObjectURL(file);

                                        return (
                                            <div className='rgm__selectedFiles__item' key={index}>
                                                <img src={file.url} alt='' />
                                            </div>
                                        )
                                    })}
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className="register-item register__option">
                <div className="rgi__title">
                    Add option

                    <div className="add_option">
                        <button
                            onClick={() => {
                                setIsShowModal(true);
                            }}
                            type='button'
                        >new</button>
                    </div>
                </div>
                <div className="register__main">
                    <div className="rgm__options">
                        <div className="rgm_options-list">
                            No options
                        </div>
                    </div>
                </div>
            </div>
            <div className="register-item register__description">
                <div className="rgi__title">
                    Description
                </div>
                <div className="register__main">
                    <textarea cols="30" rows="10"
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            {isShowModal && <AddOptionModal
                setIsShowModal={setIsShowModal}
            />}
        </div>
    )
}

export default Page2