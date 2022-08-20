import ShopProductSingle from "./ShopProductSingle";

const Items = ({ currentItems, gridView }) => {
  return (
    <div
      className={`${
        gridView
          ? "featured__products grid"
          : "featured__products-lineView grid"
      }`}
    >
      {currentItems &&
        currentItems?.map((product) => (
          <ShopProductSingle
            gridView={gridView}
            key={product._id}
            product={product}
          />
        ))}
    </div>
  );
};

export default Items;
