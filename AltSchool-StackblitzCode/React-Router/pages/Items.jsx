import { Link, Outlet } from 'react-router-dom';

export default function Items() {
  return (
    <div>
      <h1>Items</h1>
      {/* list of items */}
      <ul>
        {['fruits', 'books', 'cars', 'furnitures'].map((item) => (
          <li>
            <Link to={`/items/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
      {/* will be replaced with <NewItem /> or <Item /> depending on the route we go to */}
      <Outlet />
    </div>
  );
}
