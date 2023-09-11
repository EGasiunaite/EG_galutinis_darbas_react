import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase/firebase';
import { FaArrowLeft } from 'react-icons/fa';
import SingleShopCard from '../components/adds/SingleShopCard';

export default function SingleShopPage() {
  const params = useParams();
  console.log('params ===', params);
  const [currentAddObj, setCurrentAddObj] = useState({});

  useEffect(() => {
    console.log('Effect started');

    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, 'shops', params.shopId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setCurrentAddObj(docSnap.data());
      } else {

        console.log('No such document!');
      }
    }
    getSingleDocumentFromFirebase();
  }, [params.shopId]);


  return (
    <div className='container mx-auto mt-8'>
        <Link
        to="/shops"
        className='px-2 py-1 mb-4 inline-block  text-black'
      >
        <FaArrowLeft className="mr-2" /> Return to Shops
      </Link>
      <div className='bg-white p-8 rounded-lg shadow-md relative overflow-hidden'>
        {/* <h1 className='text-3xl mb-4 font-semibold'>
          {currentAddObj.shopName}
        </h1> */}
        <div className='relative'>
        <div className='w-32 h-32 rounded-full overflow-hidden absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          <img
            src={currentAddObj.logoImg}
            alt='Shop Logo'
            className='w-full h-auto'
          />
        </div>
        <div className="mx-auto mt-4" style={{ width: '100%' }}>
          <div
            className="w-full h-80 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${currentAddObj.shopImg})` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-20 mt-8">
        <div className="col-span-2 md:col-span-1 flex items-center">
          <p className='text-xl mb-2 text-center'>
            {currentAddObj.description}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 text-center">
          <p className='text-l mb-1'>
             {currentAddObj.town}
          </p>
          <p className='text-l mb-1'>
            <span>Opened in</span> {currentAddObj.startYear}
          </p>
          <p className='text-l mb-1'>
            {currentAddObj.phoneNumber}
          </p>
          <p className='text-l mb-1'>
             {currentAddObj.website}
          </p>
          <p className='text-l mb-1'>
             {currentAddObj.workingHours}
          </p>
        </div>
      </div>

      {/* <SingleShopCard item={currentAddObj} noDelete />
      <Link
        className='border border-slate-200 px-2 py-1 mt-3 inline-block bg-slate-600 text-white'
        to={`/shop/${params.shopId}`}
      >
        Read more
      </Link> */}
    </div>
    <Link
        to="/shops"
        className='px-2 py-1 mb-4 inline-block  text-black'
      >
        <FaArrowLeft className="mr-2" /> Return to Shops
      </Link>
    </div>
  );
}