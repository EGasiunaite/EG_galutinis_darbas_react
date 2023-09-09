import React from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import AddShopList from '../components/adds/AddShopList';


export default function ShopsPage() {
  const [addsArr, setAddsArr] = useState([]);

  useEffect(() => {
    getShops();
  }, []);

  async function getShops() {
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
  }

  function deleteFire(delId) {
    deleteDoc(doc(db, 'shops', delId))
      .then(() => {
        toast.success('The shop was deleted');
        getCards();
      })
      .catch((error) => {
        console.warn('error:', error);
        toast.error("Oups, something is wrong. Can't delete the shop. ");
      });
  }



return (
  <div className='container mx-auto p-4 mt-10'>
    <h1 className='text-3xl font-semibold mb-10 text-center'>List of Ozas stores</h1>

    <AddShopList list={addsArr} onDelete={deleteFire} />
  </div>
);
}