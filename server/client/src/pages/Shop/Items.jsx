import React from "react";
import ShopProductSingle from "./ShopProductSingle";

const Items = ({ currentItems, loading, error }) => {
  return (
    <div className="featured__products grid">
      {currentItems &&
        currentItems?.map((product) => (
          <ShopProductSingle key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Items;
