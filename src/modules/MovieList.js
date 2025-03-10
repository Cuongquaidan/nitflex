import React from "react";
import Heading from "./Heading";
import MovieItem from "./MovieItem";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const CustomLeftArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 transform -translate-y-1/2 left-[0px] z-10 bg-[rgba(0,0,0,0.5)] p-2 rounded-full xl:block hidden"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
    );
};

const CustomRightArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 transform -translate-y-1/2 right-[0px] z-[99] bg-[rgba(0,0,0,0.5)] p-2 rounded-full xl:block hidden"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
        </button>
    );
};

const MovieList = ({ heading, data, ...props }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            partialVisibilityGutter: 10,
            slidesToSlide: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1440 },
            items: 5,
            partialVisibilityGutter: 10,
            slidesToSlide: 5,
        },
        tablet: {
            breakpoint: { max: 1440, min: 1280 },
            items: 4,
            partialVisibilityGutter: 10,
            slidesToSlide: 4,
        },
        mobile: {
            breakpoint: { max: 1280, min: 1080 },
            items: 3,
            partialVisibilityGutter: 10,
            slidesToSlide: 3,
        },
        sss: {
            breakpoint: { max: 1080, min: 680 },
            items: 2,
            partialVisibilityGutter: 10,
            slidesToSlide: 2,
        },
        xxx: {
            breakpoint: { max: 680, min: 0 },
            items: 1,
            partialVisibilityGutter: 10,
            slidesToSlide: 1,
        },
    };

    return (
        <div className="w-full p-10 mt-5 ">
            <Heading>{heading}</Heading>
            <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                containerClass="carousel-container"
                itemClass=""
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                className="mt-5"
            >
                {data.map((item) => (
                    <MovieItem key={item._id} item={item} />
                ))}
            </Carousel>
        </div>
    );
};

export default MovieList;
