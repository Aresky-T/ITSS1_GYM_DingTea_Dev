import React, { useRef, useState } from 'react'

const Page2 = () => {

    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const filesRef = useRef();

    const onClickChooseFile = () => {
        if (filesRef.current) {
            filesRef.current.click();
        }
    }

    const handleChangeFiles = (e) => {
        const files = e.target.files;
        let urls = [];
        const formData = new FormData();

        for (const file of files) {
            const url = URL.createObjectURL(file);
            urls.push(url);
        }

        setSelectedFiles(urls);
    }

    return (
        <div className='page2-main'>
            <div className="register-item register__upload-image">
                <div className="rgi__title">
                    Upload image
                </div>
                <div className="register__main"
                    onClick={onClickChooseFile}
                >
                    <div className="rgm__choose-file">
                        Choose file
                    </div>
                    <div className="rgm__selectedFiles">
                        {selectedFiles.map((url, index) => (
                            <div className='rgm__selectedFiles__item' key={index}>
                                <img src={url} alt='' />
                            </div>
                        ))}
                    </div>
                    <input type="file" multiple
                        ref={filesRef}
                        onChange={handleChangeFiles}
                    />
                </div>
            </div>
            <div className="register-item register__option">
                <div className="rgi__title">
                    Add option

                    <div className="add_option">
                        <button>new</button>
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
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    )
}

export default Page2