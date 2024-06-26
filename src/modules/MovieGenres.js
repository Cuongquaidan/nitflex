import MovieItem from "./MovieItem";
import Heading from "./Heading";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const MovieGenres = ({
    heading,
    data,
    setLimit,
    setPage,
    limit,
    page,
    ...props
}) => {
    const handleButton = () => {
        if (limit === 20) {
            setLimit(40);
        } else {
            setLimit(20);
        }
    };
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + data?.params?.pagination?.totalItemsPerPage;
    const currentItems = data?.items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.params?.pagination?.totalPages);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * data?.params?.pagination?.totalItemsPerPage) %
            data?.items?.length;
        setItemOffset(newOffset);
        setPage(event.selected + 1);
        setLimit(20);
    };

    return (
        <div className="w-full px-10 mx-auto overflow-x-hidden py-30">
            <Heading classNameSub={" py-10"}>{heading}</Heading>
            <div className="grid items-center justify-center grid-cols-1 gap-10 py-16 mx-auto xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                {currentItems?.map((item, index) => (
                    <MovieItem key={item._id} item={item}></MovieItem>
                ))}
            </div>
            <button
                className="w-[300px] p-4  cursor-pointer text-white bg-pink-700 text-4xl font-medium mx-auto block mt-20 rounded-lg"
                onClick={() => handleButton(40)}
            >
                {limit === 20 ? " Xem thêm" : "Thu gọn"}
            </button>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<<"
                renderOnZeroPageCount={null}
                containerClassName="flex text-white gap-3 mx-auto w-[400px] mt-10 justify-center items-center"
                activeClassName="bg-pink-700"
                pageClassName="p-4 rounded shrink-0"
            />
        </div>
    );
};

export default MovieGenres;
