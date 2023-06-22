import React, { useEffect, useRef, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { getAllOptionsApi } from '../../api/option.api';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddOptionModal = ({ setIsShowModal }) => {
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState({
        option_id: 0,
        option_name: '',
        title: '',
        image: '',
        description: ''
    })

    const imageRef = useRef();

    const onClickUploadFile = () => {
        if(imageRef.current){
            imageRef.current.click();
        }
    }

    const handleChangeFile = (e) => {
        
    }

    const handleChangeOptionName = (e) => {
        setOption({
            ...option,
            option_name: e.target.value
        })
    }

    const handleChangeOption = (e) => {
        if(e.target){
            const {name, value} = e.target;
            setOption({
                ...option,
                [name]: value
            })
        }
    }

    useEffect(() => {
        getAllOptionsApi()
            .then(res => {
                const opts = [...res.data.data];
                setOptions(opts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='modal-container option-modal-container flex-container'>
            <div className="custom-modal">
                <div className="modal__header">
                    <h2 className='modal-title'>Add option</h2>
                    <span className="modal-btn--close"
                        onClick={() => {
                            setIsShowModal(false)
                        }}
                    >
                        <GrClose />
                    </span>
                </div>
                <div className="modal__main">
                    <h3 className="modal__main__title">
                        Select option:
                    </h3>
                    <Box className='modal-main-box'>
                        <FormControl fullWidth className='modal-main-form-control'>
                            <InputLabel id='select-option__label'
                                className='custom-label-input'
                            >Option Type</InputLabel>
                            <Select
                                labelId='select-option__label'
                                id='demo-select-option'
                                label='option'
                                value={option.option_name}
                                onChange={handleChangeOptionName}
                            >
                                {options.map(option => (
                                    <MenuItem value={option.name} key={option.id}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <h3 className="modal__main__title">
                        Title:
                    </h3>
                    <input type="text" name="title"
                        className="option-field"
                        value={option.title}
                        onChange={handleChangeOption}
                    />
                    <h3 className="modal__main__title">
                        Description:
                    </h3>
                    <textarea type="text" name="description"
                        className="option-field"
                        value={option.description}
                        onChange={handleChangeOption}
                    />
                    <h3 className="modal__main__title">
                        Upload image:
                    </h3>
                    <div className="option-image-upload">
                        <input type="file" ref={imageRef}
                        />
                        <div className="choose-file">
                            <div className="choose-file-icon"
                                onClick={onClickUploadFile}
                            >
                                <img src="https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" alt="" />
                            </div>
                            <p>Upload file</p>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button>Add option</button>
                </div>
            </div>
        </div>
    )
}

export default AddOptionModal