import { CiSearch } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { FaFilter } from "react-icons/fa"
import { useEffect } from "react";
import { getPostsBySearchApi } from "../api/post.api";
import { getGymsByFilterApi } from "../api/gym.api";
import { useState } from "react";
import { getAllOptionsApi } from "../api/option.api";
import { useNavigate } from "react-router-dom";


const fakeDataFilter = [
	{
		content: "California Fitness & Yoga offers many services with many classes of pole dancing, yoga, MMA… However, the price you have to spend is not cheap.",
		created_at: "2023-06-05T00:31:36.000000Z",
		id: 1,
		image: "post.png",
		title: "California Gym Fitness & Yoga offers many services with many classes of pole dancing, yoga, MMA"
	},
	{
		content: "California Fitness & Yoga offers many services with many classes of pole dancing, yoga, MMA… However, the price you have to spend is not cheap.",
		created_at: "2023-06-05T00:31:36.000000Z",
		id: 2,
		image: "post.png",
		title: "California Gym Fitness & Yoga offers many services with many classes of pole dancing, yoga, MMA"
	},
]

export const SearchPopup = ({ handleChangePopupStatus }) => {

	const [postsDataFilter, setPostsDataFilter] = useState([]);
	const [gymsDataFilter, setGymsDataFilter] = useState([]);
	const [options, setOptions] = useState([]);
	const [filterOptions, setFilterOptions] = useState([])
	const [search, setSearch] = useState('');

	const navigate = useNavigate();

	function changeOptionSelected(optionId) {
		const result = filterOptions.map(option => {
			if (option.id === optionId) {
				option.selected === true ? option.selected = false : option.selected = true
			}
			return option;
		})
		setFilterOptions(result);
	}

	function getAllOptions() {
		getAllOptionsApi()
			.then(res => {
				setOptions(res.data.data);
			})
			.catch(err => {
				console.log(err)
			})
	}

	function handleFilterPosts(title) {
		getPostsBySearchApi(title)
			.then(res => {
				setPostsDataFilter(res.data.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	function handleFilterGyms(name, ids) {
		getGymsByFilterApi(search, ids)
			.then(res => {
				setGymsDataFilter(res.data.data);
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		const optionsTransfer = [...options].map(option => {
			return { ...option, selected: false }
		})
		setFilterOptions(optionsTransfer);
	}, [options])

	useEffect(() => {
		let ids = [];

		for (const option of filterOptions) {
			if (option.selected === true) {
				ids = [...ids, option.id]
			}
		}

		if (search.trim().length > 0) {
			handleFilterPosts(search.trim());
			handleFilterGyms(search, ids);
		} else {
			setPostsDataFilter([]);
			setGymsDataFilter([]);
		}

	}, [search, filterOptions])

	useEffect(() => {
		getAllOptions();
	}, [])

	console.log(gymsDataFilter)

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
								<div className="filter-data-item" key={post.id}
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
								<div className="filter-data-item" key={gym.id}
									onClick={() => {
										navigate(`/gym/${gym.id}`);
										handleChangePopupStatus();
									}}
								>
									<div className="filter-data-item-image">
										<img src={gym.logo} alt="data-image" />
									</div>
									<div className="filter-data-item-title">
										{gym.description}
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