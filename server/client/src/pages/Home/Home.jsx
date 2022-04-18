import React from "react";
import {
  AppDownload,
  Brands,
  DiscountBanner,
  Footer,
  HeroSlide,
  Iphone,
  NewsLetter,
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

      <Brands />

      <NewsLetter />
      <AppDownload />

      <Footer />
    </div>
  );
};

export default Home;
