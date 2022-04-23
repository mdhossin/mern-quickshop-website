import { AiOutlineClose } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { CartList, CartSummary, CheckOut } from "../../components";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../redux/actions/cartActions";

const Cart = ({ setCartOpen, isCartOpen }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="cart">
      <div className="cart__header">
        <h5 className="cart__header-title">
          Shopping Cart ({cartItems?.length})
        </h5>
        <AiOutlineClose
          className="cart__header-icon"
          onClick={() => setCartOpen(false)}
        />
      </div>
      {cartItems.length > 0 ? (
        <div className="cart__header__body">
          <CartList
            increaseQuantity={increaseQuantity}
            deleteCartItems={deleteCartItems}
            decreaseQuantity={decreaseQuantity}
            cartItems={cartItems}
            // handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      ) : (
        <div className="cart__empty">
          <BiShoppingBag />
          <p>Your shopping cart is empty</p>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart__checkout">
          <CartSummary cartTotal={cartTotal} />
          <CheckOut setCartOpen={setCartOpen} />
        </div>
      )}
    </div>
  );
};

export default Cart;
