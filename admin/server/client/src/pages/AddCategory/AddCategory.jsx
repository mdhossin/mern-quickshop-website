import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "../../redux/actions/catetoryActions";
import { CREATE_CATEGORY_RESET } from "../../redux/constants/categoryConstants";
import { BASE_URL } from "../../config";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [category, setCategory] = useState("");

  const {
    categories: createCategoryData,
    error: createError,
    loading: createLoading,
  } = useSelector((state) => state.createCategory);
  const user = useSelector((state) => state?.userLogin?.userInfo);

  const { categories, error, loading } = useSelector(
    (state) => state.allCategories
  );

  const [callback, setCallback] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategories = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        dispatch(updateCategory(category, id));
      } else {
        dispatch(createCategory(category));
      }
      setOnEdit(false);
      setCategory("");
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      if (window.confirm("Are you sure want to delete?")) {
        const res = await axios.delete(`${BASE_URL}/api/category/${id}`, {
          headers: { Authorization: user?.access_token },
        });
        alert(res.data.message);
        setCallback(!callback);
      }
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, callback]);

  useEffect(() => {
    if (createError) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      addToast(createError, {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (createCategoryData?.message) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      addToast(createCategoryData?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setCallback(!callback);
    }
  }, [addToast, createError, dispatch, createCategoryData?.message, callback]);
  return (
    <div className="category">
      <h3>Add Category</h3>
      <div className="category__container grid">
        <form onSubmit={createCategories}>
          <h5 style={{ marginBottom: "1.5rem" }}>Category name</h5>
          <div className="category__container__text">
            <input
              type="text"
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Add category"
            />
            <button type="submit">
              {createLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>{onEdit ? "Update" : "Create"}</>
              )}
            </button>
          </div>
        </form>

        <div className="category__container__action">
          <h5>Category List</h5>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className="category__container__action__list"
                >
                  <p>{category?.name}</p>
                  <button
                    className="edit"
                    onClick={() => editCategory(category._id, category.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
