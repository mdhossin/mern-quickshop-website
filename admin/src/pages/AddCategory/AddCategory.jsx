import React from "react";

const AddCategory = () => {
  return (
    <div className="category">
      <h3>Add Category</h3>
      <div className="category__container grid">
        <div>
          <h5 style={{ marginBottom: "1.5rem" }}>Category name</h5>
          <div className="category__container__text">
            <input type="text" placeholder="Add category" />
            <button>Create</button>
          </div>
        </div>

        <div className="category__container__action">
          <h5>Category List</h5>
          <div className="category__container__action__list">
            <p>name</p>
            <button>Edit</button>
            <button className="delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
