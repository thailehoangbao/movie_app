import React, { useState } from 'react'
import PropsTypes from 'prop-types'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 10
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 7
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2
    }
};

const customStyles = {
    overlay: {
        zIndex: 9999
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function MovieList({ title, movie }) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [trailerKey,setTrailerKey] = useState('')
    const hanldeTrailer = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            };

            const movieKey = await fetch(url,options);
            const data = await movieKey.json();
            setTrailerKey(data.results[0].key);
            setIsOpen(true)
        } catch (error) {
            console.log(error)
        }
    }

    function openModal() {
        setIsOpen(true);
    }
        
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
        
    function closeModal() {
        setIsOpen(false);
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        },
    }

    return (
            <div className='text-white p-10 pb-10 relative'>
                <h2 className='uppercase text-3xl font-bold mb-5'>{title}</h2>
                <Carousel responsive={responsive} className='flex space-x-4 items-center justify-between'>
                    {movie?.map((item, index) => {
                        return (
                                <div key={item.id} className='w-[200px] h-[300px] relative group' onClick={() => hanldeTrailer(item.id)}>
                                    <div className='absolute top-0 left-0 w-full h-full bg-black/10'></div>
                                    <img 
                                        onClick={openModal}
                                        src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} 
                                        alt="" 
                                        className='w-full h-full bg-no-repeat bg-cover bg-center object-cover transform transition-transform duration-500 group-hover:scale-110' 
                                    />
                                    <div className='absolute bottom-6 left-4 flex justify-center items-center'>
                                        <p className='uppercase text-md font-semibold'>
                                            {item.title || item.origin_title}
                                        </p>
                                    </div>
                                </div>
                        );
                    })}
                </Carousel>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <YouTube videoId={trailerKey} opts={opts}  />;
                </Modal>
            </div>
    )
}

MovieList.prototype = {
    title: PropsTypes.string.isRequired,
    movie: PropsTypes.array
}

export default MovieList