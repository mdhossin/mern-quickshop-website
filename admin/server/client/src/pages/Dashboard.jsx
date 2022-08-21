import React, { useEffect, useMemo, useState } from "react";

import Box from "../components/Box/Box";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DashboardWrapper, {
  DashboardWrapperMain,
} from "../components/DashboardWrapper/DashboardWrapper";

import axios from "axios";
import { getAllOrders } from "../redux/actions/orderActions";
import { getAllProduct } from "../redux/actions/productActions";
import { userList } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);

  const productData = useSelector((state) => state.allProducts);
  const { products } = productData;
  const { orders } = useSelector((state) => state.allOrders);

  const { access_token } = useSelector((state) => state.userLogin?.userInfo);

  const { users } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllOrders());
    dispatch(userList());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        };
        const res = await axios.get(`${BASE_URL}/api/admin/stats`, config);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {
        console.log(error?.messge);
      }
    };
    getStats();
  }, [MONTHS, access_token]);
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row">
              <div className="col-4 col-md-6 col-sm-12 mb">
                <Box>
                  <div className="summary-box">
                    <div className="summary-box__info">
                      <div className="summary-box__info__title">
                        <div className="">Sales</div>
                        <span>Total sales this month</span>
                      </div>
                      <div className="summary-box__info__value">
                        ${Math.round(totalAmount)}
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
              <div className="col-4 col-md-6 col-sm-12 mb">
                <Box>
                  <div className="summary-box">
                    <div className="summary-box__info">
                      <div className="summary-box__info__title">
                        <div className="">Products</div>
                        <span>Total Products</span>
                      </div>
                      <div className="summary-box__info__value">
                        {products.length}
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
              <div className="col-4 col-md-6 col-sm-12 mb">
                <Box>
                  <div className="summary-box">
                    <div className="summary-box__info">
                      <div className="summary-box__info__title">
                        <div className="">Visits</div>
                        <span>Total vistits this month</span>
                      </div>
                      <div className="summary-box__info__value">
                        {users.length}
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <Chart
                data={userStats}
                title="User Analytics"
                grid
                dataKey="Active User"
              />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Dashboard;

const Chart = ({ title, data, dataKey, grid }) => (
  <div className="chart">
    <h3
      className="chart__title"
      style={{ marginBottom: "22px", color: "#333", fontWeight: "700" }}
    >
      {title}{" "}
    </h3>
    <ResponsiveContainer width="100%" aspect={4 / 1}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#5550bd" />
        <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        <Tooltip />
        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
  </div>
);
