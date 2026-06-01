import {useState} from "react";
import ProductListings from "./components/productListing/ProductListings.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import CartSidebar from "./components/cartSidebar/CartSidebar.jsx";
import { useSelector } from "react-redux";
import Filters from "./components/sizeFilter/Filters.jsx";
import './App.scss'


const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="app-master-container">

      <button
        className="floating-cart-toggle"
        onClick={() => setIsCartOpen((prev) => !prev)}
        aria-label="Toggle cart"
      >
        <span className="bag-icon">🛒</span>
        {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
      </button>

      <div className={`main-shop-layout ${isCartOpen ? 'cart-open' : 'cart-closed'}`}>
        <aside className="filter-column">
          <Filters />
        </aside>
        <main className="products-column">
          <ProductListings />
        </main>
        <aside className="cart-column">
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </aside>
      </div>

    </div>
  );
};

const App=()=>{
    return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}
export default App;
