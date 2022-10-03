import React from 'react';
import { useParams } from 'react-router-dom';

function H1({ children }) {
  return (
    <React.Fragment>
      <h1 style={{ fontSize: '58px', fontWeight: 400 }}>{children}</h1>
    </React.Fragment>
  );
}

function Item() {
  let { itemId } = useParams();
  // console.log(params);
  if (!['fruits', 'books', 'cars', 'furnitures'].includes(itemId)) {
    return (<div> No Item</div>)
  }

  return (
    <div>
      <H1>Item</H1>

      <p>I am on a route of {itemId}</p>
    </div>
  );
}

export default Item;
