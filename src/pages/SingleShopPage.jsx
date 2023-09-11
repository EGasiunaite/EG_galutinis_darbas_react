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
    <Link to="/shops" className='px-2 py-1 mb-4 inline-block text-black'>
      <FaArrowLeft className="mr-2" /> Return to Shops
    </Link>
    <div className='bg-white p-8 rounded-lg relative overflow-hidden'>
      <div className='relative'>
        <div className="mx-auto mt-4" style={{ width: '100%' }}>
          <div
            className="w-full h-80 bg-center rounded-lg bg-no-repeat bg-cover relative flex items-center justify-center"
            style={{ backgroundImage: `url(${currentAddObj.shopImg})` }}
          >
            <div className='w-32 h-32 rounded-full overflow-hidden relative flex items-center justify-center'>
              <img
                src={currentAddObj.logoImg}
                alt='Shop Logo'
                className='max-w-full max-h-full'
              />
            </div>
          </div>
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
    </div>
    <Link to="/shops" className='px-2 py-1 mb-4 inline-block text-black'>
      <FaArrowLeft className="mr-2" /> Return to Shops
    </Link>
  </div>
);
  }