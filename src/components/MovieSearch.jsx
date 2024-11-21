import React, { useState } from 'react'
import PropsType from 'prop-types'
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const MovieSearch = ({title,movie}) => {
    console.log(movie)
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
    return (
        <div>
            <p className='text-white px-10 py-4 uppercase text-3xl'>{title}</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 space-x-4 space-y-4 p-10'>
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
            </div>
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

export default MovieSearch

MovieSearch.PropsType = {
    title: PropsType.string,
    movie: PropsType.array
}