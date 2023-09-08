import { useAuth } from '../../store/AuthProvider';
import { FaTimes } from 'react-icons/fa';

export default function SingleShopCard(props) {
  const ctx = useAuth();
  const { id, shopName, town, startYear, description, imgUrl, userUid } = props.item;

  const isMine = userUid === ctx.userUid ? true : false;

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
    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
      <img src={imgUrl} alt="Main Image" className='w-full h-full object-cover' />
    </div>
    <p className='text-gray-600 text-center mt-4'>{description}</p>
  </div>

  <div className="flex flex-col flex-grow justify-end mt-8"> 
    <p className='text-gray-600 text-center mb-2'>Opened in {startYear}</p>
    <p className='text-gray-600 text-center'>{town}</p>
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
