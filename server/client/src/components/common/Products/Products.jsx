import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";
import SingleProduct from "./SingleProduct/SingleProduct";
import { productData } from "../../../utils/fakedata";
const Products = () => {
  //   const dispatch = useDispatch();
  //   const { products, loading } = useSelector((state) => state.adminProducts);

  //   useEffect(() => {
  //     dispatch(getAdminProduct());
  //   }, [dispatch]);

  return (
    <section className="featured container-div">
      <div className="featured__container">
        <h2 className="featured__title">Latest Products</h2>

        <div className="featured__products grid">
          <>
            {false ? (
              <Loading />
            ) : (
              <>
                {productData &&
                  productData?.slice(0, 8).map((product, i) => {
                    return <SingleProduct key={i} product={product} />;
                  })}
              </>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default Products;
