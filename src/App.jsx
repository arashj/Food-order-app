import AvailableFoods from "./components/AvailableFoods";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import Header from "./components/Header";
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/userProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <AvailableFoods />
        <Cart />
        <CheckoutModal />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
