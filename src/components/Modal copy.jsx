import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const handleSelectedFoods = (array) => {
  const foodCounts = {};
  const selectedfoodsInModal = [];

  array.forEach((element) => {
    if (foodCounts[element.id]) {
      foodCounts[element.id]++;
    } else {
      foodCounts[element.id] = 1;
      selectedfoodsInModal.push(element); // save the first occurence of each id
    }
  });

  return { foodCounts, selectedfoodsInModal };
};

export default function Modal({
  open,
  close,
  selectedFoods,
  setCheckoutModalIsOpen,
}) {
  const dialog = useRef();
  const [orderedFood, setOrderedFood] = useState({
    foodCounts: {},
    selectedfoodsInModal: [],
    totalPrice: 0,
  });

  const { SetSelectedFoods } = useContext(UpdateOrdersContext);

  useEffect(() => {
    setOrderedFood(handleSelectedFoods(selectedFoods.items));
  }, [selectedFoods]);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function AddtoOrder(id) {
    setOrderedFood((prevOrder) => ({
      ...prevOrder,
      foodCounts: { ...prevOrder.foodCounts, [id]: prevOrder.foodCounts[id]++ },
    }));
  }

  function ReduceFromOrder(id) {
    setOrderedFood((prevOrder) => ({
      ...prevOrder,
      foodCounts: {
        ...prevOrder.foodCounts,
        [id]: prevOrder.foodCounts[id] > 0 ? prevOrder.foodCounts[id] - 1 : 0,
      },
    }));
  }

  useEffect(() => {
    setOrderedFood((prevOrders) => {
      let total = 0;
      for (let id in prevOrders.foodCounts) {
        total +=
          prevOrders.foodCounts[id] *
          prevOrders.selectedfoodsInModal.find((item) => item.id === id).price;
      }

      return {
        ...prevOrders,
        totalPrice: total.toFixed(2), // to cut to two decimals
      };
    });
  }, [orderedFood.foodCounts]);

  const handleCheckout = () => {
    // before closing the newest state should be added to parent state

    //orderfood = {
    //   foodCounts: {},
    //   selectedfoodsInModal: [],
    //   totalPrice: 0,
    // }

    // pass the state update and update it

    SetSelectedFoods(() => ({
      items: orderedFood.selectedfoodsInModal,
      foodCounts: orderedFood.foodCounts,
      totalPrice: orderedFood.totalPrice,
    }));

    setCheckoutModalIsOpen(true); // update the state of checkout modal and set it to true
    close();
    // dialog.current.close(); // second close this modal
  };

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={close}>
      {open ? (
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            {orderedFood.selectedfoodsInModal.map((food) => {
              return (
                <li key={food.id} className="cart-item">
                  <p>
                    {food.name} - {orderedFood.foodCounts[food.id]} x{" "}
                    {food.price}
                  </p>
                  <div class="cart-item-actions">
                    <button onClick={() => ReduceFromOrder(food.id)}>-</button>
                    <span>{orderedFood.foodCounts[food.id]}</span>
                    <button onClick={() => AddtoOrder(food.id)}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <h2 className="cart-total">${orderedFood.totalPrice}</h2>
          <div className="modal-actions">
            <button className="text-button" onClick={close}>
              close
            </button>
            <button className="button" onClick={handleCheckout}>
              Go to checkout
            </button>
          </div>
        </div>
      ) : null}
    </dialog>,
    document.getElementById("modal")
  );
}
