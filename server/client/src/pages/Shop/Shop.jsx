import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDownload, Footer } from "../../components";
import { getAllCategories } from "../../redux/actions/categoryAction";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchShopProducts } from "../../redux/actions/productActions";
import ShopProduct from "./ShopProduct";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
const Shop = () => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const { categories } = useSelector((state) => state.allCategories);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchShopProducts(page, category, sort, search));
  }, [dispatch, page, category, sort, search]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <section className="shop-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop</title>
      </Helmet>
      <div className="title">
        <div>
          <h2>Shop</h2>

          <div className="breadcramp">
            <Link to="/">Home</Link>
            <span className="arrow">{">"}</span>
            <span className="active-page">Shop</span>
          </div>
        </div>
      </div>
      <div className="shop container-div">
        <div className="shop__filter grid">
          <div className="shop__filter__search">
            <AiOutlineSearch />
            <input
              type="text"
              value={search}
              placeholder="Enter your search!"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <div className="shop__filter__category">
            <p>Filters: </p>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">All Products</option>
              {categories?.map((category) => (
                <option
                  style={{ textTransform: "capitalize" }}
                  value={"category=" + category.name}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="shop__filter__category">
            <p>Sort by: </p>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Newest</option>
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best sales</option>
              <option value="sort=-price">Price: High-Low</option>
              <option value="sort=price">Price: Low-High</option>
            </select>
          </div>
          <div className="grid-view-container">
            <div
              onClick={() => setGridView(true)}
              className={`${gridView ? "grid-active" : "grid-icon"}`}
            >
              <BsFillGridFill />
            </div>
            <div
              onClick={() => setGridView(false)}
              className={`${!gridView ? "grid-active" : "grid-icon"}`}
            >
              <FaList />
            </div>
          </div>
        </div>

        <ShopProduct gridView={gridView} page={page} setPage={setPage} />
      </div>
      <AppDownload />
      <Footer />
    </section>
  );
};

export default Shop;
