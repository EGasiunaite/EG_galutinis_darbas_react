import React from 'react';
import { useParams } from 'react-router-dom';

function ShopPage() {
  const { shopId } = useParams();

  
  const shopData = {};

  return (
    <div>
      <h2>Shop Details</h2>
      <div>
        <h3>Shop Name: {shopData.shopName}</h3>
        <p>Town: {shopData.town}</p>
        <p>Start Year: {shopData.startYear}</p>
        <p>Description: {shopData.description}</p>
        <img src={shopData.ImgUrl} alt="Shop" />
      </div>
    </div>
  );
}

export default ShopPage;
