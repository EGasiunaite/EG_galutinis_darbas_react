import React from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import AddShopList from '../components/adds/AddShopList';
import { FaSpinner } from 'react-icons/fa';


export default function ShopsPage() {
  const [addsArr, setAddsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getShops();
  }, []);

  async function getShops() {
    setIsLoading(true);
    try {
    const querySnapshot = await getDocs(collection(db, 'shops'));
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      dataBack.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log('dataBack ===', dataBack);
    setAddsArr(dataBack);
  } catch (error) {
    console.warn('error:', error);
    toast.error("Oups, something is wrong. Can't fetch the data.");
  } finally {
    setIsLoading(false);
  }
}

  function deleteFire(delId) {
    deleteDoc(doc(db, 'shops', delId))
      .then(() => {
        toast.success('The shop was deleted');
        getShops();
      })
      .catch((error) => {
        console.warn('error:', error);
        toast.error("Oups, something is wrong. Can't delete the shop. ");
      });
  }



return (
  <div className='container mx-auto p-4 mt-10'>
    {/* <h1 className='text-3xl font-semibold mb-10 text-center'>List of Ozas stores</h1> */}
    {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <FaSpinner className='animate-spin text-4xl text-red-600' />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {addsArr.length === 0 ? (
            <p className='text-center'>Sorry, there are no shops entered yet.</p>
          ) : (
    <AddShopList list={addsArr} onDelete={deleteFire} />
      )}
      </>
      )}
  </div>
);
          }