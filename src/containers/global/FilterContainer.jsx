import React, { useEffect, useState } from 'react'
import { getPostsBySearchApi } from "../../api/post.api";
import { getGymsByFilterApi } from "../../api/gym.api";
import { getAllOptionsApi } from "../../api/option.api";
import FilterComponent from '../../components/Global/FilterComponent';

const FilterContainer = ({ handleChangePopupStatus }) => {
    const [postsDataFilter, setPostsDataFilter] = useState([]);
    const [gymsDataFilter, setGymsDataFilter] = useState([]);
    const [options, setOptions] = useState([]);
    const [filterOptions, setFilterOptions] = useState([])
    const [search, setSearch] = useState('');

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

    function handleFilterPosts(title, ids) {
        getPostsBySearchApi(title, ids)
            .then(res => {
                setPostsDataFilter(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleFilterGyms(search, ids) {
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

        const searchLength = search.trim().length;
        const idsLength = ids.length;

        if (searchLength > 0 || idsLength > 0) {
            handleFilterPosts(search.trim(), ids);
            handleFilterGyms(search.trim(), ids);
        }
        //eslint-disable-next-line
    }, [search, filterOptions])

    useEffect(() => {
        getAllOptions();
    }, [])

    return (
        <FilterComponent
            changeOptionSelected={changeOptionSelected}
            filterOptions={filterOptions}
            gymsDataFilter={gymsDataFilter}
            handleChangePopupStatus={handleChangePopupStatus}
            postsDataFilter={postsDataFilter}
            search={search}
            setSearch={setSearch}
        />
    )
}

export default FilterContainer