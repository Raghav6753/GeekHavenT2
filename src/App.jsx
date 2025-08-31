import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext, useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import HomePage from "./pages/Homeage";
import ProductDetailPage from "./pages/productpage";
import CartSidebar from "./components/cartside";
import Navbar from "./components/Navbar";
import WishlistPage from "./pages/wishlist";
import SellPage from "./pages/sellpage";
import CheckoutPage from "./pages/checkout";
import AuthPage from "./pages/authpage";
import ContactSeller from "./pages/contactseller";
import AboutPage from "./pages/about";
import LogsPage from "./pages/logs";
import Healthz from "./pages/healthz";
import SeedExamples from "./pages/seedexamples";



const App = () => {
  const navigate = useNavigate();
    const [cartOpen, setCartOpen] = useState(false);
    const { isAuthenticated } = useContext(UserContext);
  const { wishlistItems, addToWishlist } = useWishlist();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => navigate("/wishlist")}
      />
  <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
  <Routes>
        <Route
          path="/"
          element={
        <HomePage
          setCartOpen={setCartOpen}
          onAddToWishlist={addToWishlist}
        />
          }
        />
        <Route
          path="/product/:id"
          element={
      <ProductDetailPage
        setCartOpen={setCartOpen}
        onAddToWishlist={addToWishlist}
      />
          }
        />
  <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/search"
          element={<HomePage
              setCartOpen={setCartOpen}
                onAddToWishlist={addToWishlist}
            />}
        />
    <Route path="/about" element={<AboutPage />} />
  <Route path="/seed-examples" element={<SeedExamples />} />
    <Route path="/logs/recent" element={<LogsPage />} />
    <Route path="/035/healthz" element={<Healthz />} />
        <Route
          path="/sell"
          element={<SellPage />}
        />
  <Route path="/contact/:id" element={<ContactSeller />} />
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />
  </Routes>
    </>
  );
};

export default App;
