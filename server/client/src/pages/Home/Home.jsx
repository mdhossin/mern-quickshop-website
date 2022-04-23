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
import { Helmet } from "react-helmet";
const Home = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Quickshop - Ecommerce</title>
    </Helmet>
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

export default Home;
