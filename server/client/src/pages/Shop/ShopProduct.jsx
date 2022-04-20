import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ShopProductSingle from "./ShopProductSingle";

const ShopProduct = ({ page, setPage }) => {
  const { products, loading, error } = useSelector(
    (state) => state.shopProduct
  );
  console.log(products);
  return (
    // reuse css class
    <section className="featured container-div">
      <div className="featured__container">
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
                {products?.products &&
                  products?.products?.map((product, i) => {
                    return (
                      <ShopProductSingle key={product._id} product={product} />
                    );
                  })}
              </>
            )}

            {products?.result === 0 && (
              <h4 className="featured__products__notFound">
                No Products Found.
              </h4>
            )}
          </>
        </div>
        {/* <LoadMore page={page} setPage={setPage} /> */}

        {/* paignation */}

        {/* <div className="featured__button">
          <button className="button">View Products</button>
        </div> */}

        {/* {totalProducts >= 8 && (
          <div className="d-flex justify-content-center text-center mt-4">
            <Pagination
            //   handlePagenationChangeSubmit={filterProducts}
            //   products={products}
            //   pages={pages}
            //   page={pageNumber}
            />
          </div>
        )} */}
      </div>
    </section>
  );
};

export default ShopProduct;
