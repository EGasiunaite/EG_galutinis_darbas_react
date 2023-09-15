import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import AddShopList from '../components/adds/AddShopList';

export default function ShopsPage() {
  const [shopsArr, setShopsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getShops();
  }, [sortOrder, searchTerm]);

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

      // Filter 
      const filteredData = dataBack.filter((shop) =>
        shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort 
      filteredData.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.shopName.localeCompare(b.shopName);
        } else {
          return b.shopName.localeCompare(a.shopName);
        }
      });

      setShopsArr(filteredData);
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

  // Toggle sorting order
  function toggleSortOrder() {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  // Handle search input change
  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className='container mx-auto p-4 mt-10'>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSortOrder} className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700">
            {sortOrder === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
          </button>
          <div className="relative">
          <input
              type="text"
              placeholder="Search by Shop Name"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="border border-gray-300 px-2 py-1 rounded-md focus:border-red-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute top-0 right-0 p-1">
                &times;
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <FaSpinner className='animate-spin text-4xl text-red-700' />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {shopsArr.length === 0 ? (
            <p className='text-center'>Sorry, there are no shops entered yet.</p>
          ) : (
            <AddShopList list={shopsArr} onDelete={deleteFire} />
          )}
        </>
      )}
    </div>
  );
}
