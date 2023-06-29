import React from 'react'

const ConfirmModal = ({ action, handleCloseModal, handleSubmit, objType }) => {
    return (
        <div className='admin-confirm'>
            <div className="admin-confirm-modal">
                <div className="ad-confirm-header">
                    <p>Are you sure you want to {action.actionType} this {objType}?</p>
                </div>
                <div className="ad-confirm-btn">
                    <button
                        className='ad-confirm-btn--confirm'
                        onClick={handleSubmit}
                    >Confirm</button>
                    <button
                        className='ad-confirm-btn--cancel'
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal