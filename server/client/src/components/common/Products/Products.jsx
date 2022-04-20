import SingleProduct from "./SingleProduct/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../../../redux/actions/productActions";
import { Spinner } from "react-bootstrap";
const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.allProducts);
  const { products, loading, error } = productsData;

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <section className="featured container-div">
      <div className="featured__container">
        <h2 className="featured__title">Latest Products</h2>

        <div className="featured__products grid">
          <>
            {loading ? (
              <Spinner
                style={{ marginLeft: "50%", marginTop: "5%" }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : error ? (
              <h2
                style={{
                  color: "#333",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {error}
              </h2>
            ) : (
              <>
                {products &&
                  products?.slice(0, 8).map((product) => {
                    return (
                      <SingleProduct key={product?._id} product={product} />
                    );
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
