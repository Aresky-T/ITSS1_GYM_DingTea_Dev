import { CiSearch } from "react-icons/ci";
import { FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FilterComponent = ({
  handleChangePopupStatus,
  search,
  setSearch,
  filterOptions,
  changeOptionSelected,
  postsDataFilter,
  gymsDataFilter,
}) => {
  const navigate = useNavigate();

  return (
    <div className="search-popup-wrapper">
      <div className="search-popup">
        <div className="search-popup-title">検索</div>
        <div className="search-popup-top">
          <div className="popup-search">
            <span>
              <CiSearch />
            </span>
            <input
              type="text"
              name=""
              id=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="検索 ..."
            />
          </div>
          <div className="popup-filter">
            <span>
              <FaFilter size={30} />
            </span>
            <div className="options">
              {[...filterOptions].map((option) => (
                <button
                  key={option.id}
                  className={option.selected ? "option selected" : "option"}
                  style={{
                    backgroundColor: option.selected
                      ? option.backgroundColor
                      : "",
                  }}
                  onClick={() => {
                    changeOptionSelected(option.id);
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="search-popup-bottom">
          {postsDataFilter.length > 0 || gymsDataFilter.length > 0 ? (
            <div className="result-search">
              {postsDataFilter?.map((post) => (
                <div
                  className="filter-data-item post-data"
                  key={post.id}
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                    handleChangePopupStatus();
                  }}
                >
                  <div className="filter-data-item-image">
                    <img src={post.image} alt="data-img" />
                  </div>
                  <div className="filter-data-item-title">{post.title}</div>
                </div>
              ))}
              {gymsDataFilter?.map((gym) => (
                <div
                  className="filter-data-item gym-data"
                  key={gym.id}
                  onClick={() => {
                    navigate(`/gym/${gym.id}`);
                    handleChangePopupStatus();
                  }}
                >
                  <div className="filter-data-item-image">
                    <img src={gym.logo} alt="data-img" />
                  </div>
                  <div className="filter-data-content">
                    <p className="filter-data-gym-name">{gym.name}</p>
                    <p className="filter-data-gym-address">
                      <FaMapMarkerAlt /> {gym.address.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="empty-data-search">データなし!</span>
          )}
        </div>
        <span className="close-popup-icon" onClick={handleChangePopupStatus}>
          <IoClose />
        </span>
      </div>
    </div>
  );
};

export default FilterComponent;
