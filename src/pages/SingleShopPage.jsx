import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase/firebase';
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
        Return to Shops
      </Link>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl mb-4 font-semibold'>
          {currentAddObj.shopName}
        </h1>
        <img
          src={currentAddObj.logoImg}
          alt='Shop Image'
          className='w-64 h-auto mb-4 rounded-lg'
        />
        <p className='text-lg mb-2'>
          Town: {currentAddObj.town}
        </p>
        <p className='text-lg mb-2'>
          Description: {currentAddObj.description}
        </p>
        <p className='text-lg mb-2'>
          Start Year: {currentAddObj.startYear}
        </p>

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
        className='px-2 py-1 mb-4 inline-block text-black'
      >
        Return to Shops
      </Link>
    </div>
  );
}