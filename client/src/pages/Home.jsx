import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import RehomeItem from '../components/RehomeItem'
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  const [dogSpecies, setDogSpecies] = useState([]);
  const [catSpecies, setCatSpecies] = useState([]);
  SwiperCore.use([Navigation])
  console.log(dogSpecies);

  useEffect(() => {
    const fetchDogSpecies = async () => {
      try{
        const res = await fetch('/api/rehome/get?searchTerm=dog&limit=4');
        const data = await res.json();
        setDogSpecies(data);
        fetchCatSpecies();
      }catch (error) {
        console.log(error);
      }
    }

    const fetchCatSpecies = async () => {
      try{
        const res = await fetch('/api/rehome/get?searchTerm=cat&limit=4');
        const data = await res.json();
        setCatSpecies(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDogSpecies();
  }, []);

  return (
    <div>
      {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-red-700 font-bold text-3xl lg:text-6xl'>
        Ready to <span className='text-red-500'>Adopt</span> a Pet?
      </h1>
      <div className='text-gray-600 text-s sm:text-m'>
        Barks&Whiskers is the best place to find your next best buddy.
        <br/>
        We have a wide range of animals that need your love.
      </div>
      <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Let's Get Started...
      </Link>
    </div>

      {/* swiper */}

      <Swiper navigation>
      {
        dogSpecies && dogSpecies.length > 0 && 
        dogSpecies.map((rehome) => (
          <SwiperSlide>
            <div className="relative w-screen h-screen" key={rehome._id}>
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${rehome.imageUrls[0]})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
              {/* <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                 Hi, we are Adopt a Pet!
                 <br/>
                 Lets get started. Search adoptable pets from shelters, rescues, and individuals.
               </div> */}
          </SwiperSlide>
        ))}
      </Swiper>


     {/* rehome results */ }
      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {dogSpecies && dogSpecies.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-red-600'>Available Dogs</h2>
              <Link className='text-sm text-blue-800 hover:underline transition' to={'/search?searchTerm=dog'}>Show more dogs...</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                dogSpecies.map((rehome) => (
                  <RehomeItem rehome={rehome} key={rehome._id}/>
                ))
              }
            </div>
          </div>
        )}
        {catSpecies && catSpecies.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-red-600'>Available Cats</h2>
              <Link className='text-sm text-blue-800 hover:underline transition' to={'/search?searchTerm=cat'}>Show more cats...</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                catSpecies.map((rehome) => (
                  <RehomeItem rehome={rehome} key={rehome._id}/>
                ))
              }
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-red-700 font-bold text-3xl lg:text-6xl'>
        Check out our <span className='text-red-500'>Expert</span> Advice
      </h1>
      <div className='text-gray-600 text-s sm:text-m'>
        Get guidance on all things pet adoption, care, and training.
        <br/>
        We have a wealth of resources to help you and your new pet thrive together.
      </div>
      <Link to={"/blogs"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Explore adopter resources...
      </Link>
    </div>
      {/* bottom */}
    <ScrollToTop />
    </div>
  )
}
