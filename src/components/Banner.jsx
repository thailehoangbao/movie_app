import IconRating from '../assets/rating.png'
import IconRatingHaft from '../assets/rating-half.png'
import ImgTheme from '../assets/temp-1.jpeg'
import IconPlay from '../assets/play-button.png'
const Banner = () => {
    return <div className="w-full h-[700px] bg-cover bg-banner bg-no-repeat relative">
        <div className="absolute w-full h-full bg-black top-0 left-0 opacity-40"></div>
        <div className="flex items-center space-x-[30px] w-full h-full justify-center p-4 relative z-20">
            <div className='w-[50%] px-10'>
                <button className="text-white bg-gradient-to-r from-red-700 to-red-300 py-2 px-3 rounded-sm">TV show</button>
                <div className="flex flex-col space-y-4">
                    <h1 className="text-white text-[40px] font-bold">Nghe nói em thích tôi</h1>
                    <div className="flex items-center space-x-3">
                        <img src={IconRating} alt='ratingstar' className='w-[30px] h-[30px]'/>
                        <img src={IconRating} alt='ratingstar' className='w-[30px] h-[30px]'/>
                        <img src={IconRating} alt='ratingstar' className='w-[30px] h-[30px]'/>
                        <img src={IconRating} alt='ratingstar' className='w-[30px] h-[30px]'/>
                        <img src={IconRatingHaft} alt='ratingstar' className='w-[30px] h-[30px]'/>
                    </div>
                    <p className='text-white'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti quibusdam laudantium quas blanditiis. Facere voluptatum rerum quas debitis? Eaque quisquam blanditiis ducimus illum vitae veritatis numquam in reiciendis temporibus iure.
                    </p>
                    <div className='flex items-center space-x-4 '>
                        <button className='bg-black text-white px-4 py-2'>Chi tiết</button>
                        <button className='bg-red-700 text-white px-4 py-2'>Xem Phim</button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex justify-center items-center'>
                <div className='w-[300px] h-[400px] relative group'>
                    <img 
                        src={ImgTheme}
                        alt="ImgTheme"
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute top-0 left-0 w-full h-full justify-center items-center flex backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer'>
                        <img src={IconPlay} alt="play" className='w-16 h-16 z-20' />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Banner;
