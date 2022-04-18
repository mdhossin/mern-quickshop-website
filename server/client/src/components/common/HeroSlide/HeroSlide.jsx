import React from "react";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { heroSlideData } from "../../../utils/fakedata";

const HeroSlide = () => {
  return (
    <section className="hero-section">
      <div className="hero-slide">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
        >
          {heroSlideData && (
            <>
              {heroSlideData?.map((item, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <HeroSlideItem
                      item={item}
                      className={`${isActive ? "active" : ""}`}
                    />
                  )}
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </section>
  );
};

const HeroSlideItem = ({ item, className }) => {
  // console.log(item);
  return (
    <section>
      <div
        className={`hero-slide__item ${className}`}
        style={{ backgroundImage: `url(${item.slider})` }}
      >
        <div className="hero-slide__item__content container-div">
          <div className="hero-slide__item__content__info">
            <h3 className="overview">{item.overview}</h3>
            <h2 className="title">{item.title}</h2>
            <div className="btns">
              <button className="shop-now">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlide;
