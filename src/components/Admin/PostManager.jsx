import React, { useEffect, useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { ActionType } from "../../containers/admin/PostManagerContainer";
import Pagination from "../Pagination";
import ConfirmModal from "./ConfirmModal";

const PostManager = ({
  action,
  posts,
  handleCloseModal,
  handleChangeStatusPost,
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

  const handleChangeCurrentPage = (page) => {
    setPaginate({
      ...paginate,
      currentPage: page,
    });
  };

  const renderStatus = (post) => {
    if (post.status === "pending") {
      return "yellow";
    }
    if (post.status === "approve") {
      return "#99ff00";
    }
    if (post.status === "reject") {
      return "red";
    }
  };

  useEffect(() => {
    const startIndex = (paginate.currentPage - 1) * paginate.pageSize;
    const renderPosts = [...posts].splice(startIndex, paginate.pageSize);
    setPaginate({
      ...paginate,
      totalPages: Math.ceil(posts.length / paginate.pageSize),
      data: renderPosts,
    });
    //eslint-disable-next-line
  }, [posts, paginate.currentPage]);

  return (
    <div className="post-manager-container">
      <div className="post-manager-header">
        <h1 className="post-m-h__title">Post Manager</h1>
      </div>
      <section className="post-manager-main">
        <table className="post-table">
          <thead>
            <tr>
              <th>ジム</th>
              <th>タイトル</th>
              <th>作成日</th>
              <th>スターテス</th>
              <th>アクション</th>
            </tr>
          </thead>
          <tbody>
            {[...paginate.data].map((post) => (
              <tr key={post.id} className="post-item__row">
                <td>
                  <span>{post.user.name}</span>
                </td>
                <td>
                  <span>{post.title}</span>
                </td>
                <td>
                  <span>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                </td>
                <td className="pir__data--status">
                  <span>{post.status.toUpperCase()}</span>
                  <GrStatusGoodSmall color={renderStatus(post)} />
                </td>
                <td className="pir__data--action">
                  <span
                    className="pir__data__act--approve"
                    onClick={() => handleShowModal(ActionType.APPROVE, post)}
                  >
                    Approve
                  </span>
                  |
                  <span
                    className="pir__data__act--reject"
                    onClick={() => handleShowModal(ActionType.REJECT, post)}
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
          handleSubmit={handleChangeStatusPost}
          objType="post"
        />
      )}
    </div>
  );
};

export default PostManager;
