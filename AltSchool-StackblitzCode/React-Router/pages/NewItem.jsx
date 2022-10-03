import { useNavigate } from 'react-router-dom';

export default function NewItem() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Create a new Item</h1>
      <button
        onClick={() => {
          // save to db
          navigate('/items');
        }}
      >
        Click Me After Creating a new Item
      </button>
    </div>
  );
}

