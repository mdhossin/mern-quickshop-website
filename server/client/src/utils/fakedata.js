import {
  AiOutlineLaptop,
  AiOutlineWifi,
  AiOutlineCamera,
} from "react-icons/ai";
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

export const brandsData = [
  {
    id: 1,
    img: brandFive,
  },
  {
    id: 2,
    img: brandTwo,
  },
  {
    id: 3,
    img: brandThree,
  },
  {
    id: 4,
    img: brandFive,
  },
  {
    id: 5,
    img: brandOne,
  },
];

export const featuresData = [
  {
    id: 1,
    img: <AiOutlineLaptop />,
    title: "Laptop & Computers",
    desc: "We've done the research so you don't have",
  },
  {
    id: 2,
    img: <AiOutlineWifi />,
    title: "Wireless Plans",
    desc: "Unda undae uno inter. Caelumque grandia",
  },
  {
    id: 3,
    img: <AiOutlineCamera />,
    title: "Photo Camera",
    desc: "Humanas extendi quisquis nullus caesa",
  },
];
