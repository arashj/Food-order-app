import { useContext } from "react";
import UserProgressContext from "./store/userProgressContext";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Modal from "./Modal";
import Button from "./Button";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItemsPrice = cartCtx.items.reduce((totalItemsPrice, item) => {
    return totalItemsPrice + item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  console.log("userProgressCtx.progress", userProgressCtx.progress);

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((food) => {
          return (
            <li key={food.id} className="cart-item">
              <p>
                {food.name} - {food.quantity} x {food.price}
              </p>
              <div class="cart-item-actions">
                <button onClick={() => cartCtx.removeItem(food.id)}>-</button>
                <span>{food.quantity}</span>
                <button onClick={() => cartCtx.addItem(food)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <h2 className="cart-total">
        {currencyFormatter.format(totalItemsPrice)}
      </h2>
      <div className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </div>
    </Modal>
  );
}
