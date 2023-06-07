import { CiSearch } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { FaFilter } from "react-icons/fa"

export const SearchPopup = ({ handleChangePopupStatus, data, filterOptions, changeOptionSelected}) => {

	return (
		<div className="search-popup-wrapper">
			<div className="search-popup">
				<div className="search-popup-title">Search</div>
				<div className="search-popup-top">
					<div className="popup-search">
						<span><CiSearch /></span>
						<input type="text" name="" id=""
							placeholder="Search here..."
						/>
					</div>
					<div className="popup-filter">
						<span><FaFilter size={30}/></span>
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
					{data ?
						<div className="result-search"></div>
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