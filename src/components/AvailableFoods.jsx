import { useContext, useEffect } from "react";
import { fetchAvailableFoods } from "../http";
import { useState } from "react";
import { currencyFormatter } from "./util/formatting";
import CartContext from "./store/CartContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function AvailableFoods() {
  const {
    isLoading,
    data: loadedFoods,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  const cartCtx = useContext(CartContext);

  function AddToCart(item) {
    cartCtx.addItem(item);
  }

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch foods" message={error} />;
  }

  return (
    <>
      <ul id="meals">
        {loadedFoods.map((meal) => {
          return (
            <li key={meal.id} className="meal-item">
              <article>
                <img src={`http://localhost:3000/${meal.image}`} />

                <div>
                  <h3>{meal.name}</h3>
                  <p className="meal-item-price">
                    {currencyFormatter.format(meal.price)}
                  </p>
                  <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                  <button className="button" onClick={() => AddToCart(meal)}>
                    Add to Cart
                  </button>
                </p>
              </article>
              {meal.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
