import { useId } from "react";
import {
  bank,
  brandFive,
  brandOne,
  brandThree,
  brandTwo,
  like,
  money,
  plane,
  sliderOne,
  sliderThree,
  sliderTwo,
} from "../assets";

import img1 from "../assets/camera-1.png";
import img2 from "../assets/camera-2.png";
import img3 from "../assets/camera-3.png";
import img4 from "../assets/camera-4.png";
import img5 from "../assets/camera-9.webp";
import img6 from "../assets/camera-6.png";
import img7 from "../assets/camera-7.png";
import img8 from "../assets/camera-8.png";
import watch from "../assets/images/watch-1.jpg";

export const heroSlideData = [
  {
    id: 5,
    slider: sliderOne,

    title: "Everything That's New and Now",
    overview: "Trending Products",
  },
  {
    id: 1,
    slider: sliderTwo,

    title: "The Horse Watch",
    overview: "Top Collection 2022",
  },
  {
    id: 3,
    slider: sliderThree,

    title: "A Great Addition of 2022",
    overview: "The Stone Series",
  },
];

export const supportData = [
  {
    id: 1,
    title: "100% SATISFACTION",
    desc: "If you are unabler",
    img: like,
  },
  {
    id: 2,
    title: "SAVE 20% WHEN YOU",
    desc: "Use credit card",
    img: money,
  },
  {
    id: 3,
    title: "FAST FREE SHIPMENT",
    desc: "Load any computer’s",
    img: plane,
  },
  {
    id: 4,
    title: "60-DAY MONEY BACK",
    desc: "If you are unable",
    img: bank,
  },
];

export const productData = [
  {
    id: useId,
    images: {
      url: img1,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img2,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img3,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img4,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img5,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img6,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img7,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
  {
    id: useId,
    images: {
      url: img8,
    },
    Stock: 5,
    name: "Smart Watch 2022",
    ratings: 4,
    price: 777,
  },
];

export const brandsData = [
  {
    id: useId,
    img: brandFive,
  },
  {
    id: useId,
    img: brandTwo,
  },
  {
    id: useId,
    img: brandThree,
  },
  {
    id: useId,
    img: brandFive,
  },
  {
    id: useId,
    img: brandOne,
  },
];
