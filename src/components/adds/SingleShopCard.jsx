import { useAuth } from '../../store/AuthProvider';

export default function SingleShopCard(props) {
  const ctx = useAuth();
  const { id, shopName, town, startYear, description, imgUrl, userUid } = props.item;

  const isMine = userUid === ctx.userUid ? true : false;

  return (
    <li
    className={`border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center justify-center ${isMine ? 'bg-gray-100' : ''}`}
    >
      <h2 className='text-xl font-semibold mt-4 text-center'>{shopName}</h2>
      <div className="w-32 h-32 rounded-full overflow-hidden">
      <img src={imgUrl} alt="Main Image" className='w-full h-full object-cover' />
    </div>
      <p className='text-gray-600 text-center'>{description}</p>
      <p className='text-gray-600 mt-2'>Opened in {startYear}</p>
      <p className='text-gray-600'>{town}</p>
      
    
      {isMine && !props.noDelete && (
        <button
          onClick={props.onDelete}
          className='mt-2 px-2 py-1 text-white bg-red-400 rounded-md hover:bg-red-300 transition duration-300 text-xs'
        >
          delete
        </button>
      )}
    </li>
  );
}
