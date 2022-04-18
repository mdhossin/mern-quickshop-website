import React, { Fragment } from "react";
import { AiOutlineStar } from "react-icons/ai";
const ProductRating = ({ ratingValue }) => {
  let rating = [];

  for (let i = 0; i < 5; i++) {
    rating.push(<AiOutlineStar key={i} />);
  }
  if (ratingValue && ratingValue > 0) {
    for (let i = 0; i <= ratingValue - 1; i++) {
      rating[i] = <AiOutlineStar style={{ color: "#f3b632" }} key={i} />;
    }
  }
  return <Fragment>{rating}</Fragment>;
};

export default ProductRating;
