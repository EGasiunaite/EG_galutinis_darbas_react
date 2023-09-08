import { useAuth } from '../../store/AuthProvider';

export default function SingleShopCard(props) {
  const ctx = useAuth();
  const { id, shopName, town, startYear, description, imgUrl, userUid } = props.item;

  const isMine = userUid === ctx.userUid ? true : false;

  return (
    <li
    className={`border border-gray-300 p-4 rounded-lg shadow-md ${isMine ? 'bg-gray-100' : ''
      }`}
    >
      <h2 className='text-xl font-semibold'>{shopName}</h2>
      <p className='text-gray-600'>{town}</p>
      <p className='text-gray-600'>{startYear}</p>
      <p className='text-gray-600'>{description}</p>
      <img src={imgUrl} alt="Main Image" className='w-full max-h-96' />
    
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
