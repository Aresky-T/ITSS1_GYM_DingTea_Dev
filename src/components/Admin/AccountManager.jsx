import React, { useEffect, useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../config/toastConfig";
import { ActionType } from "../../containers/admin/PostManagerContainer";
import Pagination from "../Pagination";
import ConfirmModal from "./ConfirmModal";

const AccountManager = ({
  action,
  gyms,
  handleCloseModal,
  handleChangeStatusGym,
  handleShowModal,
}) => {
  const [paginate, setPaginate] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    firstLabel: "First",
    lastLabel: "Last",
    data: [],
  });

  const navigate = useNavigate();

  const handleChangeCurrentPage = (page) => {
    setPaginate({
      ...paginate,
      currentPage: page,
    });
  };

  useEffect(() => {
    const startIndex = (paginate.currentPage - 1) * paginate.pageSize;
    const renderPosts = [...gyms].splice(startIndex, paginate.pageSize);
    setPaginate({
      ...paginate,
      totalPages: Math.ceil(gyms.length / paginate.pageSize),
      data: renderPosts,
    });
    //eslint-disable-next-line
  }, [gyms, paginate.currentPage]);
  return (
    <div className="account-manager-container">
      <div className="account-manager-header">
        <h1 className="account-m-h__title">ジム管理</h1>
      </div>
      <section className="account-manager-main">
        <table className="account-table">
          <thead>
            <tr>
              <th>名前</th>
              <th>電話番号</th>
              <th>アドレス</th>
              <th>作成時間</th>
              <th>スターテス</th>
              <th>アクション</th>
            </tr>
          </thead>
          <tbody>
            {[...paginate.data].map((gym) => (
              <tr key={gym.id} className="account-item__row">
                <td>
                  <span>{gym.name}</span>
                </td>
                <td>
                  <span>{gym.phone_num}</span>
                </td>
                <td>
                  <span>{gym.address?.address || "Hà Nội"}</span>
                </td>
                <td>
                  <span>
                    {new Date(gym.created_at).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                </td>
                <td className="air__data--status">
                  <span>{gym.status.toUpperCase()}</span>
                  <GrStatusGoodSmall
                    color={gym.status === "active" ? "#99ff00" : "red"}
                  />
                </td>
                <td className="air__data--action">
                  <span
                    className="air__data__act--approve"
                    onClick={() => handleShowModal(ActionType.APPROVE, gym)}
                  >
                    Approve
                  </span>
                  |
                  <span
                    className="air__data__act--view"
                    onClick={() => {
                      if (gym.status === "inactive") {
                        customToast("Cannot view this gym!", "⚠️");
                      } else {
                        navigate(`/gym/${gym.id}`);
                      }
                    }}
                  >
                    View
                  </span>
                  |
                  <span
                    className="air__data__act--reject"
                    onClick={() => handleShowModal(ActionType.REJECT, gym)}
                  >
                    Reject
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination
            currentPage={paginate.currentPage}
            firstLabel={paginate.firstLabel}
            lastLabel={paginate.lastLabel}
            setCurrentPage={handleChangeCurrentPage}
            totalPage={paginate.totalPages}
          />
        </div>
      </section>
      {action.isShowConfirm && (
        <ConfirmModal
          action={action}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleChangeStatusGym}
          objType="gym"
        />
      )}
    </div>
  );
};

export default AccountManager;
