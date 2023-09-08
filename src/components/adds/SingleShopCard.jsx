import { useAuth } from '../../store/AuthProvider';

export default function SingleShopCard(props) {
  const ctx = useAuth();
  const { id, shopName, town, userUid } = props.item;

  const isMine = userUid === ctx.userUid ? true : false;

  return (
    <li
    className={`border border-gray-300 p-4 rounded-lg shadow-md ${isMine ? 'bg-amber-100' : ''
      }`}
    >
      <h2 className='text-xl font-semibold'>{shopName}</h2>
      <p className='text-gray-600'>{town}</p>
      <p className='text-gray-600'>userUid: {userUid}</p>
    
      {isMine && !props.noDelete && (
        <button
          onClick={props.onDelete}
          className='mt-2 px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300'
        >
          delete
        </button>
      )}
    </li>
  );
}
