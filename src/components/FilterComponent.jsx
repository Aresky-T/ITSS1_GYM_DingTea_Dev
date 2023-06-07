import { CiSearch } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { FaFilter } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const FilterComponent = ({
	handleChangePopupStatus,
	search, setSearch,
	filterOptions,
	changeOptionSelected,
	postsDataFilter, gymsDataFilter
}) => {

	const navigate = useNavigate();

	return (
		<div className="search-popup-wrapper">
			<div className="search-popup">
				<div className="search-popup-title">Search</div>
				<div className="search-popup-top">
					<div className="popup-search">
						<span><CiSearch /></span>
						<input type="text" name="" id=""
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search here..."
						/>
					</div>
					<div className="popup-filter">
						<span><FaFilter size={30} /></span>
						<div className="options">
							{[...filterOptions].map(option =>
								<button
									key={option.id}
									className={option.selected ? "option selected" : "option"}
									onClick={() => {
										changeOptionSelected(option.id)
									}}
								>
									{option.name}
								</button>)}
						</div>
					</div>
				</div>
				<div className="search-popup-bottom">
					{(postsDataFilter.length > 0 || gymsDataFilter.length > 0) ?
						<div className="result-search">
							{postsDataFilter?.map(post => (
								<div className="filter-data-item post-data" key={post.id}
									onClick={() => {
										navigate(`/post/${post.id}`);
										handleChangePopupStatus();
									}}
								>
									<div className="filter-data-item-image">
										<img src={post.image} alt="data-image" />
									</div>
									<div className="filter-data-item-title">
										{post.title}
									</div>
								</div>
							))}
							{gymsDataFilter?.map(gym => (
								<div className="filter-data-item gym-data" key={gym.id}
									onClick={() => {
										navigate(`/gym/${gym.id}`);
										handleChangePopupStatus();
									}}
								>
									<div className="filter-data-item-image">
										<img src={gym.logo} alt="data-image" />
									</div>
									<div className="filter-data-item-title">
										{gym.name}
									</div>
								</div>
							))}
						</div>
						:
						<span className="empty-data-search">Data empty!</span>}
				</div>
				<span className="close-popup-icon"
					onClick={handleChangePopupStatus}
				>
					<IoClose />
				</span>
			</div>
		</div>
	)
}

export default FilterComponent;