export async function fetchAvailableFoods() {
  const response = await fetch("http://localhost:3000/meals");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.message);
  }
  return data;
}

export async function UpdateSelectedFoods(order) {
  console.log("order: ", order);
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "content-type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update orders.");
  }

  return resData.message;
}
