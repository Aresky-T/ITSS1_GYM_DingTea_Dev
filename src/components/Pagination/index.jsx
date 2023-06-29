import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const loadPage = (currentPage, totalPage, firstLabel, lastLabel) => {
    const loadPages = [];
    const startIndex = Math.max(currentPage - 5, 1);
    const endIndex = Math.min(startIndex + 9, totalPage);

    if(startIndex > 1){
        loadPages.unshift(firstLabel);
    }

    for(let i = startIndex; i <= endIndex; i++){
        loadPages.push(i);
    }

    if(endIndex < totalPage){
        loadPages.push(lastLabel);
    }

    return loadPages;
}

const Pagination = ({ currentPage, totalPage, setCurrentPage, firstLabel, lastLabel }) => {
    const [pages, setPages] = useState([1]);

    const handleChangeCurrentPage = (page) => {
        if (page === firstLabel) {
            setCurrentPage(1);
        };
        if (page === lastLabel) {
            setCurrentPage(totalPage);
        }

        typeof (page) === "number" && setCurrentPage(page)
    }

    useEffect(() => {
        const pages = loadPage(currentPage, totalPage, firstLabel, lastLabel);
        setPages(pages);
    }, [currentPage, firstLabel, lastLabel, totalPage])

    return (
        <div className='pagination-main'>
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => {
                        handleChangeCurrentPage(page)
                    }}
                    className={currentPage === page ? "paginate-item active" : "paginate-item"}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination