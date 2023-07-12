import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PostDetails = ({ post, recentPosts, recentGyms }) => {
  console.log("🚀 ~ file: PostDetails.jsx:5 ~ PostDetails ~ post:", post);
  const navigate = useNavigate();

  function handleConvertOptionToString(option) {
    const arr = [];
    for (const opt of option) {
      arr.push(opt.title);
    }

    if (arr.length === option.length) {
      return arr.join(", ");
    }
  }

  return (
    <div className="post-details-container">
      <div className="content_area">
        <div className="post-details">
          <div className="flex-container title_area">
            <img className="avatar" src={post?.user.logo} alt="" />
            <div className="name">
              <Link to={`/gym/${post?.user.id}`}>{post?.user.name}</Link>
            </div>
            <div className="post_time time">
              {new Date(post?.created_at).toLocaleDateString("vi-VN")}
            </div>
          </div>
          <div className="title">{post?.title}</div>
          <img className="image" src={post?.image} alt="" />
          <p className="content">{post?.content}</p>
        </div>

        <div className="side_content">
          <div className="introduce">新しい投稿</div>
          {recentPosts?.map((post) => (
            <div
              className="flex-container post_card"
              key={post.id}
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              <div className="post_avatar">
                <img src={post.image} alt="" />
              </div>
              <div className="post_content">
                <div className="flex-container author_n_time">
                  <div className="post_author">{post.user.name}</div>
                  <div className="post_time">
                    {new Date(post.created_at).toLocaleDateString("vi-VN", {
                      dateStyle: "short",
                    })}
                  </div>
                </div>
                <div className="post_title">
                  <p>{post.title}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="introduce">注目のジム</div>

          {recentGyms?.map((gym) => (
            <div
              className="flex-container gym_card"
              key={gym.id}
              onClick={() => {
                navigate(`/gym/${gym.id}`);
              }}
            >
              <div className="gym_image">
                <img src={gym.logo} alt="" />
              </div>
              <div className="gym_content">
                <div className="gym_content_item gym_name">{gym.name}</div>
                <div className="gym_content_item gym_address">
                  <p>
                    <b>アドレス:</b> <i>{gym.address?.address}</i>
                  </p>
                </div>
                <div className="gym_content_item gym_detail">
                  <p>
                    <b>オプション:</b>{" "}
                    <i>{handleConvertOptionToString(gym.user_option)}</i>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
