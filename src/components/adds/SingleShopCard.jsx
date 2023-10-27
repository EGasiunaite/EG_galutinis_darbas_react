import { useAuth } from '../../store/AuthProvider';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';

export default function SingleShopCard(props) {
  const ctx = useAuth();
  const { id, shopName, town, startYear, description, logoImg, userUid } = props.item;

  const isMine = userUid === ctx.userUid ? true : false;

  const handleDelete = () => {

    const confirmDelete = window.confirm('Are you sure you want to delete this shop?');
    
    if (confirmDelete) {
      props.onDelete();
    }
  };

  return (
<li className={`relative border border-gray-300 p-4 rounded-lg shadow-md bg-gray-100 ${isMine ? 'bg-gray-300' : ''}`}>
  <div className="relative">
    {isMine && !props.noDelete && (
      <div className="absolute top-0 right-0">
        <FaTimes
          onClick={props.onDelete}
          className='text-red-400 cursor-pointer'
        />
      </div>
    )}
    <h2 className='text-xl font-semibold mt-4 text-center mb-8'>{shopName}</h2>
    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
      <img src={logoImg} alt="Logo Image" className='w-full h-full object-cover' />
    </div>
    <p className='text-gray-600 text-s text-center mt-4 mb-10'>{description}</p>
  </div>

  <div className="absolute bottom-0 left-0 w-full"> 
    {/* <p className='text-gray-600 text-center mb-2'>Opened in {startYear}</p>
    <p className='text-gray-600 text-center'>{town}</p> */}
    <Link
    className='border-b border-r border-slate-200 px-2 py-1 bg-slate-800 text-white text-center w-full block rounded-lg hover:bg-slate-500'
    to={`/shop/${id}`}
  >
        Read more
      </Link>
  </div>
      
    
      {/* {isMine && !props.noDelete && (
        <button
          onClick={props.onDelete}
          className='mt-2 px-2 py-1 text-white bg-red-400 rounded-md hover:bg-red-300 transition duration-300 text-xs'
        >
          delete
        </button>
      )} */}
    </li>
  );
}
