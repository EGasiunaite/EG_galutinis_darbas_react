import SingleShopCard from './SingleShopCard';

export default function AddShopList(props) {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {props.list.map((addObj) => (
        <SingleShopCard
          key={addObj.id}
          item={addObj}
          onDelete={() => props.onDelete(addObj.id)}
        />
      ))}
    </ul>
  );
}