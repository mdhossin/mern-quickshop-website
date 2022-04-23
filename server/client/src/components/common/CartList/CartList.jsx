import { AiOutlineClose } from "react-icons/ai";

const CartList = ({
  cartItems,
  decreaseQuantity,
  increaseQuantity,
  deleteCartItems,
}) => {
  return (
    <div className="cart__header__body__list">
      {cartItems?.map((item, index) => (
        <div key={index} className="cart__header__body__list__item">
          <img
            src={item.image}
            className="cart__header__body__list__item-img"
            alt=""
          />
          <div className="cart__header__body__list__item__details">
            <div className="cart__header__body__list__item__details__name">
              {" "}
              <a
                href="#home"
                className="cart__header__body__list__item__details__name-title"
              >
                {item.name}
              </a>
              <a href="#home">
                <AiOutlineClose
                  className="cart__header__body__list__item__details__name-delete"
                  onClick={() => deleteCartItems(item.product)}
                />
              </a>
            </div>

            <div className="cart__header__body__list__item__details__price">
              <div className="cart__header__body__list__item__details__price__wrapper">
                <div className="cart__header__body__list__item__details__price__wrapper__buttons">
                  <div className="cart__header__body__list__item__details__price__wrapper__buttons-quantity">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                      className="minus"
                    >
                      -
                    </button>
                    <input
                      className="input"
                      readOnly
                      type="number"
                      value={item.quantity}
                    />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                      className="add"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart__header__body__list__item__details__price__wrapper-price">
                  ${item.price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
