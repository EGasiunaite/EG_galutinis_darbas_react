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
<div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>SingleShopPage</h1>
      <img src={currentAddObj.imgUrl} alt='hero' />
      <h2 className='text-2xl font-semibold'>
        Name: {currentAddObj.shopName}
      </h2>
      <p className='text-2xl font-semibold'>
        Town: {currentAddObj.town}
      </p>

      {/* <SingleShopCard item={currentAddObj} noDelete />
      <Link
        className='border border-slate-200 px-2 py-1 mt-3 inline-block bg-slate-600 text-white'
        to={`/shop/${params.shopId}`}
      >
        Read more
      </Link> */}
    </div>
  );
}