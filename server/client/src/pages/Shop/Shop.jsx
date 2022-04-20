import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components";
import { getAllCategories } from "../../redux/actions/categoryAction";

import { fetchShopProducts } from "../../redux/actions/productActions";
import ShopProduct from "./ShopProduct";

const Shop = () => {
  const dispatch = useDispatch();

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
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="shop section container-div">
        <div className="shop__filter">
          <div className="row">
            <span>Filters: </span>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">All Products</option>
              {categories?.map((category) => (
                <option value={"category=" + category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={search}
            placeholder="Enter your search!"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />

          <div className="shop__filter__select">
            <div>
              <b>Sort by: </b>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Newest</option>
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best sales</option>
              <option value="sort=-price">Price: Hight-Low</option>
              <option value="sort=price">Price: Low-Hight</option>
            </select>
          </div>
        </div>

        <ShopProduct page={page} setPage={setPage} />
      </div>
      <Footer />
    </>
  );
};

export default Shop;
