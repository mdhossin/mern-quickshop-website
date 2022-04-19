import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const CartSummary = ({ cartTotal }) => {
  return (
    <div className="cart-summary">
      <Container>
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">SubTotal</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">${cartTotal}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartSummary;
