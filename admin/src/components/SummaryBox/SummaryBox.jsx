import React from "react";

import Box from "../Box/Box";

const SummaryBox = ({ totalAmount }) => {
  return (
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
  );
};

export default SummaryBox;
