import React from "react";
import {
  DiscountBanner,
  HeroSlide,
  Iphone,
  Products,
  SupportArea,
} from "../../components";

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <SupportArea />
      <DiscountBanner />
      <Products />
      <Iphone />
    </div>
  );
};

export default Home;
