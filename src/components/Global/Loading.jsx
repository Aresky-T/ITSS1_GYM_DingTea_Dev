import React from 'react'
import { useSelector } from 'react-redux'
import { loadingSelector } from '../../redux/selector'

const Loading = () => {

    const isLoading = useSelector(loadingSelector);

    return (
        <>
            {isLoading &&
                <div className='loading-container'>
                    <div className="lds-dual-ring"></div>
                </div>
            }
        </>
    )
}

export default Loading