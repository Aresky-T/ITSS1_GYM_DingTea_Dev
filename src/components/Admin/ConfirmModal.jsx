import React from "react";

const ConfirmModal = ({ action, handleCloseModal, handleSubmit, objType }) => {
  return (
    <div className="admin-confirm">
      <div className="admin-confirm-modal">
        <div className="ad-confirm-header">
          <p>
            この {objType} を {action.actionType} してもよろしいですか?
          </p>
        </div>
        <div className="ad-confirm-btn">
          <button className="ad-confirm-btn--confirm" onClick={handleSubmit}>
            確認
          </button>
          <button className="ad-confirm-btn--cancel" onClick={handleCloseModal}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
