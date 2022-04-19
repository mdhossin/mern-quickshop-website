import { AiOutlineHome } from "react-icons/ai";

import { BiCube, BiReceipt } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
const sidebarNav = [
  {
    link: "/dashboard/",
    section: "home",
    icon: <AiOutlineHome />,
    text: "Home",
  },
  {
    link: "/dashboard/orders",
    section: "orders",
    icon: <BiReceipt />,
    text: "Orders",
  },
  {
    link: "/dashboard/products",
    section: "products",
    icon: <BiCube />,
    text: "Products",
  },
  {
    link: "/dashboard/addProduct",
    section: "addProduct",
    icon: <CgAddR />,
    text: "Add Product",
  },
  {
    link: "/dashboard/users",
    section: "users",
    icon: <FiUsers />,
    text: "Users",
  },
];

export default sidebarNav;
