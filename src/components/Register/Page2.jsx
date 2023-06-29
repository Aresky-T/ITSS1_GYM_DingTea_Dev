import React, { useEffect, useRef, useState } from 'react'
import AddOptionModal from './AddOptionModal';

const Page2 = ({ page2 }) => {

    const [selectedFiles, setSelectedFiles] = useState({
        imageFiles: [...page2.values.imageFiles],
        logoFile: [...page2.values.logoFile]
    })
    const [options, setOptions] = useState([...page2.values.options]);

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
        if (selectedFiles.imageFiles.length > 0 && selectedFiles.logoFile.length > 0) {
            page2.setValues({
                ...page2.values,
                imageFiles: selectedFiles.imageFiles,
                logoFile: selectedFiles.logoFile
            })
        }
        //eslint-disable-next-line
    }, [selectedFiles])
    console.log(options)

    useEffect(() => {
        setOptions(page2.values.options)
    }, [page2])

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
                            [...selectedFiles.imageFiles].length === 0 ?
                                <>
                                    <div className="rgm__choose-file">
                                        Choose file
                                    </div>
                                    <input
                                        type="file"
                                        name='imageFiles'
                                        multiple
                                        ref={imagesRef}
                                        onChange={handleChangeFiles}
                                    />
                                </>
                                :
                                <div className="rgm__selectedFiles">
                                    {[...selectedFiles.imageFiles].map((file, index) => {
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
                            [...selectedFiles.logoFile].length === 0 ?
                                <>
                                    <div className="rgm__choose-file">
                                        Choose file
                                    </div>
                                    <input type="file"
                                        name='logoFile'
                                        ref={logoRef}
                                        onChange={handleChangeFiles}
                                    />
                                </>
                                :
                                <div className="rgm__selectedFiles">
                                    {[...selectedFiles.logoFile].map((file, index) => {
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
                            {options.map(opt => (
                                <div className='rgm_options__item' key={opt.title}>
                                    <div className="rgm_opt-img">
                                        <img src={opt?.image} alt="" />
                                    </div>
                                    <div className='rgm_opt-details'>
                                        <h4 className="rgm_opt__title">
                                            {opt?.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
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
                        value={page2.values.description}
                        onChange={page2.handleChange}
                    />
                </div>
            </div>
            {isShowModal && <AddOptionModal
                page2={page2}
                setIsShowModal={setIsShowModal}
            />}
        </div>
    )
}

export default Page2