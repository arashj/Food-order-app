import { useContext, useState } from "react";
import Modal from "./Modal";
import CheckoutModal from "./CheckoutModal";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/userProgressContext";

export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);

  const cartCtx = useContext(CartContext);

  const TotalNumberOfSelectedFoods = cartCtx.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src="./logo.jpg" alt="Title Image" />
          <h1>Foodshop</h1>
        </div>
        <nav>
          <button className="text-button" onClick={userProgressCtx.showCart}>
            Cart({TotalNumberOfSelectedFoods})
          </button>
        </nav>
      </header>
    </>
  );
}
