import { Col, Container, Row } from "react-bootstrap";

const CartSummary = ({ cartTotal }) => {
  const shippingCharges = cartTotal < 1000 ? 0 : 100;
  const subTotal = cartTotal + shippingCharges;
  return (
    <div className="cart-summary">
      <Container>
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Shipping Fee</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">${shippingCharges}</p>
          </Col>
        </Row>
        <hr />
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">SubTotal</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">${subTotal.toFixed(2)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartSummary;
